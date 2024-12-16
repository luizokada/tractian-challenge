import axios, { AxiosInstance, AxiosStatic, GenericAbortSignal } from 'axios';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

// e?.response.data.message === 'This user by email already exists.'
type ErrorType = {
  response: {
    data: {
      message: string;
      error: string;
      statusCode: number;
      [key: string]: string | number | boolean | undefined;
    };
  };
};

interface useFetchTypes<T> {
  axiosClient?: AxiosStatic | AxiosInstance;
  url: string;
  params?: {
    [key: string]: string | number | boolean | undefined;
  };
  fetchName: string | string[];
  options?:
    | Omit<UseQueryOptions<T, ErrorType, T, QueryKey>, 'queryKey' | 'queryFn'>
    | undefined;
  header?: {
    [key: string]: string | number | boolean | undefined;
  };
}

/**
 *@param {string} fetchName: Query key for react-query
 *@param {AxiosStatic | AxiosInstance} axiosClient: Axios instance
 *@param {string} url: URL to fetch
 *@param {Object} params: Url query params
 *@param {Omit<UseQueryOptions<T, ErrorType, T, QueryKey>, 'queryKey' | 'queryFn'>| undefined} options: Options for react-query
 *@param {Object} header: Headers to fetch
 *@returns { useFetchTypes<T>} Returns data from fetch, error, status and more
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFetch = <T = any>({
  fetchName,
  axiosClient = axios,
  url,
  params = {},
  options = {},
  header = {},
}: useFetchTypes<T>) => {
  const fetch = async ({ signal }: { signal?: GenericAbortSignal }) => {
    const { data } = await axiosClient.get(url, {
      signal,
      params,
      headers: {
        ...header,
      },
    });

    return data;
  };

  return useQuery<T, ErrorType>(fetchName, fetch, {
    ...options,
    enabled: options.enabled,
  });
};
