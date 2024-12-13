import React, { lazy, Suspense, useEffect, useRef } from 'react';
import SearchIcon from '../../../icons/SearchIcon';
import { FilterType } from '../../../types/filter';
import { Tree } from '../../../utils/Tree';
import {
  AssetTreeListWrapper,
  AssetTreeWrapper,
  SearchInputContainer,
} from './styles';

const AssetTreeList = lazy(() => import('./AssetTreeList'));

interface AssetTreeProps {
  tree?: Tree;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}

const AssetTree: React.FC<AssetTreeProps> = ({ setFilter, tree }) => {
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
          <Suspense fallback={<div>Component1 are loading please wait...</div>}>
            <AssetTreeList currentNode={tree} renderRight={1000} />
          </Suspense>
        )}
      </AssetTreeListWrapper>
    </AssetTreeWrapper>
  );
};

export default AssetTree;
