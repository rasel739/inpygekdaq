import { Genre, Movie } from '@/types/movie.type';
import MovieCarousel from '../ui/movie-carousel';

const GenreSection = ({ genre, movies }: { genre: Genre; movies: Movie[] }) => {
  if (movies.length === 0) return null;
  return <MovieCarousel movies={movies} title={genre.name} genreId={genre.id} />;
};

export default GenreSection;
