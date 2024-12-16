import React, { lazy, Suspense, useEffect, useMemo, useRef } from 'react';
import SearchIcon from '../../../icons/SearchIcon';
import { FilterType } from '../../../types/filter';
import { Tree } from '../../../utils/Tree';
import {
  AssetTreeListWrapper,
  AssetTreeWrapper,
  LoaderWrapper,
  SearchInputContainer,
} from './styles';
import { useIsFetchingQueries } from '../../../hooks/useIsFetchingQueries';
import Loader from '../../../commom/Loader';

const AssetTreeList = lazy(() => import('./AssetTreeList'));

interface AssetTreeProps {
  tree?: Tree;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  activeFilter: FilterType;
}

const AssetTree: React.FC<AssetTreeProps> = ({
  setFilter,
  tree,
  activeFilter,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const isFeatching = useIsFetchingQueries(['getAssets', 'getLocations']);

  const isLoading = useMemo(() => {
    return !!isFeatching;
  }, [isFeatching]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilter((prev) => ({ ...prev, search: searchTerm }));
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm, setFilter]);

  useEffect(() => {
    setSearchTerm(activeFilter.search || '');
  }, [activeFilter.search]);

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
      {isLoading && (
        <LoaderWrapper>
          <Loader size={50} />
        </LoaderWrapper>
      )}
      {!isLoading && (
        <AssetTreeListWrapper>
          {tree && (
            <Suspense
              fallback={<div>Component1 are loading please wait...</div>}
            >
              <AssetTreeList
                currentNode={tree}
                renderRight={1000}
                activeFilter={activeFilter}
              />
            </Suspense>
          )}
        </AssetTreeListWrapper>
      )}
    </AssetTreeWrapper>
  );
};

export default AssetTree;
