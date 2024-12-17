import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Asset } from '../../api-types/asset';
import { Location } from '../../api-types/location';
import Header from '../../commom/Header';
import { SensorEnum } from '../../const/sensor';
import { StatusEnum } from '../../const/status';
import { CompanieContext } from '../../context/Companie';
import ThunderboltIcon from '../../icons/ThunderboltIcon';
import WarningIcon from '../../icons/WarningIcon';
import { FilterType } from '../../types/filter';
import { Tree } from '../../utils/Tree';
import AssetTree from './AssetTree';
import ComponentInfo from './ComponentInfo';
import {
  AssetInfosWrapper,
  AssetTreeFilterButton,
  AssetTreeFilterController,
  CompanieInfo,
  HomeCompanieFilterInfo,
  HomeContainer,
} from './styles';

function filterString(stringTofilter: string, search: string) {
  const normalizedName = stringTofilter
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  return normalizedName.includes(
    search
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase(),
  );
}

function getFilteredAssets(assets: Asset[], filter: FilterType): Asset[] {
  return assets.filter((asset) => {
    const statusFilter = filter.status ? asset.status === filter.status : true;
    const typeFilter = filter.type ? asset.sensorType === filter.type : true;

    const searchFilter = filter.search
      ? filterString(asset.name, filter.search)
      : true;

    return statusFilter && typeFilter && searchFilter;
  });
}

function filterTree(
  tree: Tree,
  whiteList: String[],
  activeFilter: FilterType,
): Tree | undefined {
  const search = activeFilter.search;
  const isSomeFilterActive = !!activeFilter.status || !!activeFilter.type;
  if (!whiteList.length && !search) {
    return tree;
  }

  if (!whiteList.length && tree.asset) {
    return;
  }
  if (search) {
    if (filterString(tree.name, search) && !tree.asset) {
      const childrean = tree.childrean
        .map((child) => filterTree(child, whiteList, activeFilter))
        .filter((child) => !!child);

      console.log(tree.name, childrean);
      if (childrean.length > 0 || !isSomeFilterActive) {
        return new Tree({
          id: tree.id,
          name: tree.name,
          parentId: tree.parentId,
          level: tree.level,
          parent: tree.parent,
          asset: tree.asset,
          childrean,
        });
      }
    }
  }

  const childrean = tree.childrean
    .map((child) => filterTree(child, whiteList, activeFilter))
    .filter((child) => !!child);

  if (whiteList.includes(tree.id)) {
    return new Tree({
      id: tree.id,
      name: tree.name,
      parentId: tree.parentId,
      level: tree.level,
      parent: tree.parent,
      asset: tree.asset,
      childrean: childrean,
    });
  }

  if (childrean.length === 0) {
    return;
  }

  return new Tree({
    id: tree.id,
    name: tree.name,
    parentId: tree.parentId,
    level: tree.level,
    parent: tree.parent,
    asset: tree.asset,
    childrean,
  });
}

const Home: React.FC = () => {
  const { selectedCompany, companies, locations, assets } =
    useContext(CompanieContext);

  const [activeFilter, setActiveFilter] = useState<FilterType>({
    status: undefined,
    type: undefined,
    search: undefined,
  });

  const { setSelectedAsset } = useContext(CompanieContext);

  useEffect(() => {
    setSelectedAsset(undefined);
  }, [selectedCompany, activeFilter]);

  const currentTree = useMemo(() => {
    if (locations && locations.length && assets && assets.length) {
      const locationsDicst: {
        [key: string]: {
          data: Location | undefined;
          childrean: {
            id: string;
            type: string;
          }[];
        };
      } = {};

      locations.forEach((loc) => {
        locationsDicst[loc.id] = {
          data: loc,
          childrean: [],
        };
        if (!loc.parentId && !locationsDicst['root']) {
          locationsDicst['root'] = {
            data: undefined,
            childrean: [{ id: loc.id, type: 'location' }],
          };
          return;
        }
        if (!loc.parentId) {
          locationsDicst['root'].childrean.push({
            id: loc.id,
            type: 'location',
          });
        }
      });

      locations.forEach((loc) => {
        if (loc.parentId) {
          locationsDicst[loc.parentId].childrean.push({
            id: loc.id,
            type: 'location',
          });
        }
      });

      const assetsDict: {
        [key: string]: {
          data: Asset | undefined;
          childrean: string[];
        };
      } = {};

      assets.forEach((asset) => {
        assetsDict[asset.id] = {
          data: asset,
          childrean: [],
        };

        const isRoot = !asset.locationId && !asset.parentId;

        if (isRoot && !assetsDict['root']) {
          assetsDict['root'] = {
            data: undefined,
            childrean: [asset.id],
          };
          return;
        }
        if (isRoot && assetsDict['root']) {
          assetsDict['root'].childrean.push(asset.id);
          return;
        }
      });

      assets.forEach((asset) => {
        if (asset.parentId) {
          assetsDict[asset.parentId].childrean.push(asset.id);
        }

        if (asset.locationId) {
          locationsDicst[asset.locationId].childrean.push({
            id: asset.id,
            type: 'asset',
          });
        }
      });

      const tree = Tree.initTree(locationsDicst, assetsDict, {
        id: 'root',
        name: 'root',
        parentId: undefined,
        level: 0,
        childrean: [],
        parent: undefined,
      });

      return tree;
    }
    return undefined;
  }, [selectedCompany, locations, assets]);

  const treeToRender = useMemo(() => {
    if (!currentTree || !assets || !locations) {
      return undefined;
    }
    if (!activeFilter.status && !activeFilter.type && !activeFilter.search) {
      return currentTree;
    }

    const assetWhiteList: String[] = [];
    if (activeFilter.type || activeFilter.status || activeFilter.search) {
      assetWhiteList.push(
        ...getFilteredAssets(assets, activeFilter).map((asset) => asset.id),
      );
    }

    const whiteListToFilter = assetWhiteList;

    if (whiteListToFilter.length === 0 && !activeFilter.search) {
      return;
    }
    const tree = filterTree(currentTree, whiteListToFilter, activeFilter);
    return tree;
  }, [currentTree, activeFilter, assets, locations]);

  const selectedCompainieInfo = useMemo(() => {
    return companies?.find((companie) => companie.id === selectedCompany);
  }, [selectedCompany, companies]);

  const shouldRendeClearFilters = useMemo(() => {
    return (
      !!activeFilter.status || !!activeFilter.type || !!activeFilter.search
    );
  }, [activeFilter]);
  return (
    <main>
      <Header />
      <HomeContainer>
        <HomeCompanieFilterInfo>
          <CompanieInfo>
            <h1>
              Ativos /<span>{selectedCompainieInfo?.name}</span>
            </h1>
          </CompanieInfo>
          <AssetTreeFilterController>
            {shouldRendeClearFilters && (
              <AssetTreeFilterButton
                $isActive={false}
                onClick={() =>
                  setActiveFilter(() => {
                    return {
                      search: undefined,
                      status: undefined,
                      type: undefined,
                    };
                  })
                }
              >
                <p>Limpar Filtros</p>
              </AssetTreeFilterButton>
            )}
            <AssetTreeFilterButton
              $isActive={!!activeFilter.type}
              onClick={() =>
                setActiveFilter((prev) => {
                  return {
                    ...prev,
                    type: prev.type ? undefined : SensorEnum.ENERGY,
                  };
                })
              }
            >
              <ThunderboltIcon
                color={!!activeFilter.type ? '#fff' : undefined}
              />{' '}
              <p>Sensor de Energia</p>
            </AssetTreeFilterButton>
            <AssetTreeFilterButton
              $isActive={!!activeFilter.status}
              onClick={() =>
                setActiveFilter((prev) => {
                  return {
                    ...prev,
                    status: prev.status ? undefined : StatusEnum.ALERT,
                  };
                })
              }
            >
              <WarningIcon color={!!activeFilter.status ? '#fff' : undefined} />{' '}
              <p>Critico</p>
            </AssetTreeFilterButton>
          </AssetTreeFilterController>
        </HomeCompanieFilterInfo>
        <AssetInfosWrapper>
          <AssetTree
            tree={treeToRender}
            setFilter={setActiveFilter}
            activeFilter={activeFilter}
          />
          <ComponentInfo />
        </AssetInfosWrapper>
      </HomeContainer>
    </main>
  );
};

export default Home;
