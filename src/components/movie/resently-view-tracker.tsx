'use client';

import { useMovies } from '@/lib/movie-provider';
import { MovieWithCredits } from '@/types/movie.type';
import { useEffect } from 'react';

interface RecentlyViewedTrackerProps {
  movie: MovieWithCredits;
}

const RecentlyViewTracker = ({ movie }: RecentlyViewedTrackerProps) => {
  const { addToRecentlyViewed } = useMovies();

  useEffect(() => {
    addToRecentlyViewed({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
    });
  }, [
    movie.id,
    movie.title,
    movie.poster_path,
    movie.vote_average,
    movie.release_date,
    addToRecentlyViewed,
  ]);

  return null;
};

export default RecentlyViewTracker;
