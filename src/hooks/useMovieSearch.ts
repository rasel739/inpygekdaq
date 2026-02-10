'use client';

import { useCallback, useEffect, useReducer } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useDebounce from '@/hooks/useDebounce';
import { PaginatedResponse, Movie } from '@/types/movie.type';
import { searchReducer, SearchState } from '@/reducers/search.reducers';

export const useMovieSearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get('q') || '';

  const initialState: SearchState = {
    query: initialQuery,
    results: [],
    page: 1,
    totalPages: 0,
    totalResults: 0,
    isLoading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(searchReducer, initialState);
  const debouncedQuery = useDebounce(state.query, 500);

  const fetchMovies = useCallback(async (query: string, page = 1) => {
    if (!query.trim()) {
      dispatch({ type: 'RESET' });
      return;
    }

    dispatch({ type: 'FETCH_START' });

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&page=${page}`);

      if (!res.ok) throw new Error('Failed to search movies');

      const data: PaginatedResponse<Movie> = await res.json();

      dispatch({
        type: 'FETCH_SUCCESS',
        payload: {
          results: data.results,
          page: data.page,
          totalPages: data.total_pages,
          totalResults: data.total_results,
        },
      });
    } catch (err) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: err instanceof Error ? err.message : 'Something went wrong',
      });
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set('q', debouncedQuery);

    router.replace(`/search?${params.toString()}`);
    fetchMovies(debouncedQuery);
  }, [debouncedQuery, fetchMovies, router]);

  return {
    state,
    setQuery: (q: string) => dispatch({ type: 'SET_QUERY', payload: q }),
    setPage: (p: number) => dispatch({ type: 'SET_PAGE', payload: p }),
    fetchMovies,
  };
};
