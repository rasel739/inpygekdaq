import { Movie, SortOptionItem } from './movie.type';

export interface GenrePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sort?: string; page?: string }>;
}

export interface GenreClientProps {
  genreId: number;
  genreName: string;
  initialMovies: Movie[];
  totalPages: number;
  totalResults: number;
  currentPage: number;
  currentSort: SortOptionItem;
  sortOptions: readonly SortOptionItem[];
}
