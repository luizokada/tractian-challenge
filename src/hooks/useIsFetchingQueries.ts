import { useIsFetching } from 'react-query';
import { Query } from 'react-query';

const handleIsFetching = (queryArray: Array<string>) => {
  return {
    predicate: (query: Query) => queryArray.includes(query.queryKey as string),
  };
};

/**
 *@param {Array<string>} queryArray: Array with the name of the queries used on useFetch
 */

export const useIsFetchingQueries = (queryArray: Array<string>) => {
  return useIsFetching(handleIsFetching(queryArray));
};
