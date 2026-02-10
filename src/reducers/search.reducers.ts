import { Movie } from '@/types/movie.type';

export type SearchState = {
  query: string;
  results: Movie[];
  page: number;
  totalPages: number;
  totalResults: number;
  isLoading: boolean;
  error: string | null;
};

export type SearchAction =
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'FETCH_START' }
  | {
      type: 'FETCH_SUCCESS';
      payload: {
        results: Movie[];
        page: number;
        totalPages: number;
        totalResults: number;
      };
    }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'RESET' };

export const searchReducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload,
        page: 1,
        results: [],
      };

    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload,
      };

    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        results: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
        totalResults: action.payload.totalResults,
      };

    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case 'RESET':
      return {
        ...state,
        results: [],
        totalPages: 0,
        totalResults: 0,
        error: null,
      };

    default:
      return state;
  }
};
