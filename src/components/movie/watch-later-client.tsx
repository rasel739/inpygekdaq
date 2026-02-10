'use client';

import { useMovies } from '@/lib/movie-provider';
import EmptyState from '../ui/empty-state';
import MovieGrid from '../ui/movie-grid';

const WatchLaterClient = () => {
  const { watchLater, clearWatchLater } = useMovies();

  if (watchLater.length === 0) {
    return (
      <EmptyState
        icon='bookmark'
        title='No movies in your watch list'
        description='Click the bookmark icon on any movie to add it to your watch later list.'
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
          {watchLater.length} movie{watchLater?.length !== 1 ? 's' : ''}
        </p>
        <button
          onClick={clearWatchLater}
          className='text-sm text-red-400 transition-colors hover:text-red-300'
        >
          Clear All
        </button>
      </div>

      <MovieGrid movies={watchLater} />
    </>
  );
};

export default WatchLaterClient;
