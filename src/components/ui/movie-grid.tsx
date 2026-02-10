'use client';
import { MovieGridProps } from '@/types/movie.type';
import { getGridClass } from '@/utils/helpers.utils.';
import MovieCard from './movie-card';

const MovieGrid = ({ movies, showWatchLater = true, columns = 'auto' }: MovieGridProps) => {
  return (
    <div className={`grid ${getGridClass(columns)} gap-4 md:gap-6`}>
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          showWatchLater={showWatchLater}
          priority={index < 6}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
