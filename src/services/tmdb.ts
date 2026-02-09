import {
  Genre,
  GenresResponse,
  Movie,
  MovieWithCredits,
  PaginatedResponse,
  SortOption,
} from '@/types/movie.type';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';

class TMDBError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = 'TMDBError';
  }
}

const fetchFromTMDB = async <T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> => {
  if (!TMDB_API_KEY) {
    throw new TMDBError('TMDB API key is not configured', 500);
  }

  const searchParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    ...params,
  });

  const url = `${TMDB_BASE_URL}${endpoint}?${searchParams.toString()}`;

  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ status_message: 'Unknown error' }));
    throw new TMDBError(error.status_message || 'Failed to fetch from TMDB', response.status);
  }

  return response.json();
};

export const getGenres = async (): Promise<Genre[]> => {
  const data = await fetchFromTMDB<GenresResponse>('/genre/movie/list');
  return data.genres;
};

export const getTopRatedMovies = async (page: number = 1): Promise<PaginatedResponse<Movie>> => {
  return fetchFromTMDB<PaginatedResponse<Movie>>('/movie/top_rated', {
    page: page.toString(),
  });
};

export const getPopularMovies = async (page: number = 1): Promise<PaginatedResponse<Movie>> => {
  return fetchFromTMDB<PaginatedResponse<Movie>>('/movie/popular', {
    page: page.toString(),
  });
};

export const discoverMoviesByGenre = async (
  genreId: number,
  page: number = 1,
  sortBy: SortOption = 'popularity.desc'
): Promise<PaginatedResponse<Movie>> => {
  return fetchFromTMDB<PaginatedResponse<Movie>>('/discover/movie', {
    with_genres: genreId.toString(),
    page: page.toString(),
    sort_by: sortBy,
  });
};

export const getMovieDetails = async (movieId: number): Promise<MovieWithCredits> => {
  return fetchFromTMDB<MovieWithCredits>(`/movie/${movieId}`, {
    append_to_response: 'credits',
  });
};

export const getSimilarMovies = async (
  movieId: number,
  page: number = 1
): Promise<PaginatedResponse<Movie>> => {
  return fetchFromTMDB<PaginatedResponse<Movie>>(`/movie/${movieId}/similar`, {
    page: page.toString(),
  });
};

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<PaginatedResponse<Movie>> => {
  return fetchFromTMDB<PaginatedResponse<Movie>>('/search/movie', {
    query,
    page: page.toString(),
  });
};

export const getPopularMoviesByGenre = async (
  genreId: number,
  limit: number = 5
): Promise<Movie[]> => {
  const data = await discoverMoviesByGenre(genreId, 1, 'popularity.desc');
  return data.results.slice(0, limit);
};
