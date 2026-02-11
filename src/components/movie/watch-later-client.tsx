'use client';

import { useMovies } from '@/lib/movie-provider';
import EmptyState from '../ui/empty-state';
import MovieGrid from '../ui/movie-grid';
import { Button } from '../ui/button';

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
        <Button variant='danger' onClick={clearWatchLater}>
          Clear All
        </Button>
      </div>

      <MovieGrid movies={watchLater} />
    </>
  );
};

export default WatchLaterClient;
