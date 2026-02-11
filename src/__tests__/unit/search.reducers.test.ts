import { describe, it, expect } from 'vitest';
import { searchReducer, SearchState } from '@/reducers/search.reducers';

const initialState: SearchState = {
  query: '',
  results: [],
  page: 1,
  totalPages: 0,
  totalResults: 0,
  isLoading: false,
  error: null,
};

const mockMovie = {
  id: 550,
  title: 'Fight Club',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  overview: 'A movie about fight club',
  release_date: '1999-10-15',
  vote_average: 8.4,
  vote_count: 25000,
  genre_ids: [18, 53],
  popularity: 60,
  adult: false,
  original_language: 'en',
  original_title: 'Fight Club',
  video: false,
};

describe('searchReducer', () => {
  describe('SET_QUERY', () => {
    it('sets the query and resets page to 1 and results to empty', () => {
      const stateWithResults: SearchState = {
        ...initialState,
        results: [mockMovie],
        page: 3,
        query: 'old query',
      };

      const newState = searchReducer(stateWithResults, {
        type: 'SET_QUERY',
        payload: 'inception',
      });

      expect(newState.query).toBe('inception');
      expect(newState.page).toBe(1);
      expect(newState.results).toEqual([]);
    });
  });

  describe('SET_PAGE', () => {
    it('updates the page number', () => {
      const newState = searchReducer(initialState, {
        type: 'SET_PAGE',
        payload: 5,
      });

      expect(newState.page).toBe(5);
    });

    it('preserves other state properties', () => {
      const stateWithData = {
        ...initialState,
        query: 'test',
        results: [mockMovie],
      };

      const newState = searchReducer(stateWithData, {
        type: 'SET_PAGE',
        payload: 3,
      });

      expect(newState.query).toBe('test');
      expect(newState.results).toEqual([mockMovie]);
      expect(newState.page).toBe(3);
    });
  });

  describe('FETCH_START', () => {
    it('sets isLoading to true and clears error', () => {
      const stateWithError: SearchState = {
        ...initialState,
        isLoading: false,
        error: 'Previous error',
      };

      const newState = searchReducer(stateWithError, { type: 'FETCH_START' });

      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBeNull();
    });
  });

  describe('FETCH_SUCCESS', () => {
    it('stores results and pagination data, sets isLoading to false', () => {
      const loadingState: SearchState = {
        ...initialState,
        isLoading: true,
      };

      const newState = searchReducer(loadingState, {
        type: 'FETCH_SUCCESS',
        payload: {
          results: [mockMovie],
          page: 1,
          totalPages: 10,
          totalResults: 200,
        },
      });

      expect(newState.isLoading).toBe(false);
      expect(newState.results).toEqual([mockMovie]);
      expect(newState.page).toBe(1);
      expect(newState.totalPages).toBe(10);
      expect(newState.totalResults).toBe(200);
    });
  });

  describe('FETCH_ERROR', () => {
    it('sets error message and stops loading', () => {
      const loadingState: SearchState = {
        ...initialState,
        isLoading: true,
      };

      const newState = searchReducer(loadingState, {
        type: 'FETCH_ERROR',
        payload: 'Network error',
      });

      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe('Network error');
    });
  });

  describe('RESET', () => {
    it('clears results, pagination, and error but preserves query', () => {
      const populatedState: SearchState = {
        ...initialState,
        query: 'inception',
        results: [mockMovie],
        totalPages: 10,
        totalResults: 200,
        error: 'some error',
      };

      const newState = searchReducer(populatedState, { type: 'RESET' });

      expect(newState.results).toEqual([]);
      expect(newState.totalPages).toBe(0);
      expect(newState.totalResults).toBe(0);
      expect(newState.error).toBeNull();
      expect(newState.query).toBe('inception');
    });
  });

  describe('default case', () => {
    it('returns state unchanged for unknown action type', () => {
      // @ts-expect-error - testing invalid action type
      const newState = searchReducer(initialState, { type: 'UNKNOWN_ACTION' });
      expect(newState).toEqual(initialState);
    });
  });
});
