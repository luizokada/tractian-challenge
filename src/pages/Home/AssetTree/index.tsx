import React, { lazy, Suspense, useEffect, useMemo, useRef } from 'react';
import Loader from '../../../commom/Loader';
import SearchIcon from '../../../icons/SearchIcon';
import { FilterType } from '../../../types/filter';
import { Tree } from '../../../utils/Tree';
import {
  AssetTreeListWrapper,
  AssetTreeWrapper,
  LoaderWrapper,
  NotFoundComponent,
  SearchInputContainer,
} from './styles';

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
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilter((prev) => ({ ...prev, search: searchTerm }));
    }, 100);
    return () => clearTimeout(timeout);
  }, [searchTerm, setFilter]);

  useEffect(() => {
    setSearchTerm(activeFilter.search || '');
  }, [activeFilter.search]);

  const isSomeFitlerActive = useMemo(() => {
    return (
      !!activeFilter.status || !!activeFilter.type || !!activeFilter.search
    );
  }, [activeFilter]);
  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [isSomeFitlerActive, tree?.childrean]);

  const renderRight = useMemo(() => {
    return isSomeFitlerActive ? 1000 : 1001;
  }, [isSomeFitlerActive]);

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
          {!tree && isSomeFitlerActive && (
            <NotFoundComponent>
              <p>Nenhum ativo encontrado com os filtros selecionados</p>
            </NotFoundComponent>
          )}
          {tree && (
            <Suspense
              fallback={<div>Component1 are loading please wait...</div>}
            >
              <AssetTreeList
                currentNode={tree}
                renderRight={renderRight}
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
