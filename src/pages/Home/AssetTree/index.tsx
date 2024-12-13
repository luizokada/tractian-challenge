import React, { useEffect, useRef } from 'react';
import { Tree } from '../../../utils/Tree';
import {
  AssetTreeListWrapper,
  AssetTreeWrapper,
  SearchInputContainer,
} from './styles';
import SearchIcon from '../../../icons/SearchIcon';
import { FilterType } from '../../../types/filter';
import AssetTreeList from './AssetTreeList';
import { Asset } from '../../../api-types/asset';

// import { Container } from './styles';

interface AssetTreeProps {
  tree?: Tree;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  setSelectedAsset: React.Dispatch<React.SetStateAction<Asset | undefined>>;
  seletedAsset?: Asset;
}

const AssetTree: React.FC<AssetTreeProps> = ({
  setFilter,
  tree,
  setSelectedAsset,
  seletedAsset,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilter((prev) => ({ ...prev, search: searchTerm }));
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm, setFilter]);

  return (
    <AssetTreeWrapper>
      <SearchInputContainer
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        <input
          ref={inputRef}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Buscar Ativo ou Local"
        />
        <div
          onClick={(e) => {
            e.stopPropagation();
            setFilter((prev) => ({
              ...prev,
              search: searchTerm,
            }));
          }}
        >
          <SearchIcon />
        </div>
      </SearchInputContainer>
      <AssetTreeListWrapper>
        {tree && (
          <AssetTreeList
            currentNode={tree}
            setSelectedAsset={setSelectedAsset}
            selectedAsset={seletedAsset}
          />
        )}
      </AssetTreeListWrapper>
    </AssetTreeWrapper>
  );
};

export default AssetTree;
