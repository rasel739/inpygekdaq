import GenreSection from '@/components/home/genre-section';
import GenresList from '@/components/home/genres-list';
import HeroSection from '@/components/home/hero-section';
import MovieCarousel from '@/components/ui/movie-carousel';
import { getGenres, getPopularMoviesByGenre, getTopRatedMovies } from '@/services/tmdb';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [genres, topRatedData] = await Promise.all([getGenres(), getTopRatedMovies(1)]);

  const topRatedMovies = topRatedData.results;
  const featuredMovie = topRatedMovies[0];

  const genreMoviesPromises = genres.map(async (genre) => ({
    genre,
    movies: await getPopularMoviesByGenre(genre.id, 5),
  }));

  const genreMovies = await Promise.all(genreMoviesPromises);

  return (
    <div className='min-h-screen'>
      <HeroSection movie={featuredMovie} />

      <div className='container mx-auto px-4 py-8'>
        <MovieCarousel movies={topRatedMovies.slice(0, 10)} title='Top Rated Movies' />

        <GenresList genres={genres} />

        <div className='space-y-2'>
          {genreMovies.map(({ genre, movies }) => (
            <GenreSection key={genre.id} genre={genre} movies={movies} />
          ))}
        </div>
      </div>
    </div>
  );
}
