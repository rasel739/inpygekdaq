import GenreClient from '@/components/movie/genre-client';
import { SORT_OPTIONS } from '@/constants/movie.constants';
import { discoverMoviesByGenre, getGenres } from '@/services/tmdb';
import { GenrePageProps } from '@/types/genre.type';
import { SortOption } from '@/types/movie.type';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: GenrePageProps): Promise<Metadata> {
  const { id } = await params;
  const genres = await getGenres();
  const genre = genres.find((g) => g.id === parseInt(id));

  if (!genre) {
    return { title: 'Genre Not Found' };
  }

  return {
    title: `${genre.name} Movies`,
    description: `Discover the best ${genre.name} movies. Browse and sort by popularity, release date, rating, and more.`,
    openGraph: {
      title: `${genre.name} Movies | Movie Discovery App`,
      description: `Discover the best ${genre.name} movies.`,
    },
  };
}

const Genre = async ({ params, searchParams }: GenrePageProps) => {
  const { id } = await params;
  const { sort = 'popularity.desc', page = '1' } = await searchParams;

  const genreId = parseInt(id);
  const currentPage = parseInt(page) || 1;
  const sortBy = sort as SortOption;

  const isValidSort = SORT_OPTIONS.some((opt) => opt.value === sortBy);
  const validSortValue = isValidSort ? sortBy : 'popularity.desc';
  const validSortBy = SORT_OPTIONS.find((opt) => opt.value === validSortValue) || SORT_OPTIONS[0];

  const [genres, moviesData] = await Promise.all([
    getGenres(),
    discoverMoviesByGenre(genreId, currentPage, validSortValue),
  ]);

  const genre = genres.find((g) => g.id === genreId);

  if (!genre) {
    notFound();
  }
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='mb-2 text-3xl font-bold text-white md:text-4xl'>{genre.name} Movies</h1>
        <p className='text-gray-400'>{moviesData.total_results.toLocaleString()} movies found</p>
      </div>

      <GenreClient
        genreId={genreId}
        genreName={genre.name}
        initialMovies={moviesData.results}
        totalPages={moviesData.total_pages}
        totalResults={moviesData.total_results}
        currentPage={currentPage}
        currentSort={validSortBy}
        sortOptions={SORT_OPTIONS}
      />
    </div>
  );
};

export default Genre;
