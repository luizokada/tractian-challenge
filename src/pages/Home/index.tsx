import React, { useContext, useEffect, useMemo, useState } from 'react';
import Header from '../../commom/Header';
import { CompanieContext } from '../../context/Companie';
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
import { Asset } from '../../api-types/asset';
import { Location } from '../../api-types/location';
import { SensorEnum } from '../../const/sensor';
import { StatusEnum } from '../../const/status';
import ThunderboltIcon from '../../icons/ThunderboltIcon';

// import { Container } from './styles';

function getAssetsBySensorType(assets: Asset[], sensorType: string): Asset[] {
  return assets.filter((asset) => asset.sensorType === sensorType);
}

function getAssetsByStatus(assets: Asset[], status: string): Asset[] {
  return assets.filter((asset) => asset.status === status);
}

function getAssetsBySearch(assets: Asset[], search: string): Asset[] {
  return assets.filter((asset) => {
    const normalizedName = asset.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    return normalizedName.includes(
      search
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase(),
    );
  });
}
function getLocationsBySearch(location: Location[], search: string) {
  return location.filter((location) => {
    const normalizedName = location.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    return normalizedName.includes(
      search
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase(),
    );
  });
}

function filterTree(tree: Tree, whiteList: String[]): Tree | undefined {
  if (!whiteList.length) {
    return tree;
  }

  if (whiteList.includes(tree.id)) {
    return new Tree({
      id: tree.id,
      name: tree.name,
      parentId: tree.parentId,
      level: tree.level,
      parent: tree.parent,
      data: tree.asset,
      children: [],
    });
  }
  const children = tree.children
    .map((child) => filterTree(child, whiteList))
    .filter((child) => !!child);
  if (children.length === 0) {
    return;
  }

  return new Tree({
    id: tree.id,
    name: tree.name,
    parentId: tree.parentId,
    level: tree.level,
    parent: tree.parent,
    data: tree.asset,
    children,
  });
}

const Home: React.FC = () => {
  const { selectedCompany, companies, location, assets } =
    useContext(CompanieContext);

  const [activeFilter, setActiveFilter] = useState<FilterType>({
    status: undefined,
    type: undefined,
    search: undefined,
  });

  const [selectedAsset, setSelectedAsset] = useState<Asset | undefined>();

  useEffect(() => {
    setSelectedAsset(undefined);
  }, [selectedCompany, activeFilter]);

  const currentTree = useMemo(() => {
    if (location && location.length && assets && assets.length) {
      const tree = Tree.initTree(location, assets, {
        id: 'root',
        name: 'root',
        parentId: undefined,
        level: 0,
        children: [],
        parent: undefined,
      });
      return tree;
    }
    return undefined;
  }, [selectedCompany, location, assets]);

  const treeToRender = useMemo(() => {
    if (!currentTree || !assets || !location) {
      return undefined;
    }
    if (!activeFilter.status && !activeFilter.type && !activeFilter.search) {
      return currentTree;
    }

    const assetWhiteList: String[] = [];
    if (activeFilter.type) {
      assetWhiteList.push(
        ...getAssetsBySensorType(assets, activeFilter.type).map(
          (asset) => asset.id,
        ),
      );
    }
    if (activeFilter.status) {
      assetWhiteList.push(
        ...getAssetsByStatus(assets, activeFilter.status).map(
          (asset) => asset.id,
        ),
      );
    }
    if (activeFilter.search) {
      assetWhiteList.push(
        ...getAssetsBySearch(assets, activeFilter.search).map(
          (asset) => asset.id,
        ),
      );
    }

    const locationWhiteList: String[] = [];
    if (activeFilter.search) {
      locationWhiteList.push(
        ...getLocationsBySearch(location, activeFilter.search).map(
          (location) => location.id,
        ),
      );
    }

    const whiteListToFilter = [
      ...new Map(assetWhiteList.map((item) => [item, item])).keys(),
      ...new Map(locationWhiteList.map((item) => [item, item])).keys(),
      ,
    ].filter((item) => !!item);

    if (whiteListToFilter.length === 0) {
      return;
    }
    const tree = filterTree(currentTree, whiteListToFilter);
    return tree;
  }, [currentTree, activeFilter, assets, location]);

  const selectedCompainieInfo = useMemo(() => {
    return companies?.find((companie) => companie.id === selectedCompany);
  }, [selectedCompany, companies]);
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
            setSelectedAsset={setSelectedAsset}
            seletedAsset={selectedAsset}
          />
          <ComponentInfo selectedAsset={selectedAsset} />
        </AssetInfosWrapper>
      </HomeContainer>
    </main>
  );
};

export default Home;