'use client';

import { useMovies } from '@/lib/movie-provider';
import EmptyState from '../ui/empty-state';
import MovieGrid from '../ui/movie-grid';

const ResentlyClient = () => {
  const { recentlyViewed, clearRecentlyViewed } = useMovies();

  if (recentlyViewed.length === 0) {
    return (
      <EmptyState
        icon='clock'
        title='No recently viewed movies'
        description="Start exploring movies and they'll appear here."
        action={{
          label: 'Browse Movies',
          href: '/',
        }}
      />
    );
  }

  return (
    <>
      <div className='mb-6 flex items-center justify-between'>
        <p className='text-sm text-gray-400'>
          {recentlyViewed.length} movie{recentlyViewed.length !== 1 ? 's' : ''}
        </p>
        <button
          onClick={clearRecentlyViewed}
          className='text-sm text-red-400 transition-colors hover:text-red-300'
        >
          Clear All
        </button>
      </div>

      <MovieGrid movies={recentlyViewed} />
    </>
  );
};

export default ResentlyClient;
