import React, { createContext, useEffect, useState } from 'react';

import { useQueryClient } from 'react-query';

import { Asset, AssetFromApi } from '../../api-types/asset';
import { CompaniesFromApi } from '../../api-types/companies';
import { LocationFromApi } from '../../api-types/location';
import { useFetch } from '../../hooks/useFetch';
import { TractionApi } from '../../services';

type CompanieContextType = {
  companies: CompaniesFromApi | undefined;

  selectedCompany: string;
  setSelectedCompany: React.Dispatch<React.SetStateAction<string>>;
  assets: AssetFromApi | undefined;
  locations: LocationFromApi | undefined;
  selectedAsset: Asset | undefined;
  setSelectedAsset: React.Dispatch<React.SetStateAction<Asset | undefined>>;
};

export const CompanieContext = createContext<CompanieContextType>({
  companies: undefined,
  assets: undefined,
  locations: undefined,

  selectedAsset: undefined,
  setSelectedAsset: () => {},
  selectedCompany: '',
  setSelectedCompany: () => {},
});

type CompanieProviderProps = {
  children: React.ReactNode;
};
const CompanieProvider: React.FC<CompanieProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();

  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedAsset, setSelectedAsset] = useState<Asset>();

  const { data: companies } = useFetch<CompaniesFromApi>({
    fetchName: 'getCompanies',
    url: '/companies',
    axiosClient: TractionApi,
    options: {
      retry: false,
      cacheTime: 10,
    },
  });

  const { data: assets, refetch: getAsset } = useFetch<AssetFromApi>({
    fetchName: ['getAssets', selectedCompany],
    url: `/companies/${selectedCompany}/assets`,
    axiosClient: TractionApi,
    options: {
      retry: false,
      enabled: false,
      cacheTime: 3600,
    },
  });
  const { data: locations, refetch: getLocation } = useFetch<LocationFromApi>({
    fetchName: ['getLocation', selectedCompany],
    url: `/companies/${selectedCompany}/locations`,
    axiosClient: TractionApi,
    options: {
      retry: false,
      enabled: false,
      cacheTime: 3600,
    },
  });

  useEffect(() => {
    if (!selectedCompany) return;

    //get data from cache
    const cachedLocationData = queryClient
      .getQueryCache()
      .find(['getLocation', selectedCompany])?.state?.data;

    if (!cachedLocationData) {
      getLocation();
    }
    const assetCachedData = queryClient
      .getQueryCache()
      .find(['getAssets', selectedCompany])?.state?.data;
    if (!assetCachedData) {
      getAsset();
    }

    if (cachedLocationData) {
      queryClient.setQueryData(
        ['getLocation', selectedCompany],
        cachedLocationData,
      );
    }

    if (assetCachedData) {
      queryClient.setQueryData(['getAssets', selectedCompany], assetCachedData);
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (companies && companies.length && !selectedCompany) {
      setSelectedCompany(companies[0].id);
    }
  }, [companies]);

  return (
    <CompanieContext.Provider
      value={{
        companies,
        selectedCompany,
        setSelectedCompany,
        assets,
        locations,
        selectedAsset,
        setSelectedAsset,
      }}
    >
      {children}
    </CompanieContext.Provider>
  );
};

export default CompanieProvider;
