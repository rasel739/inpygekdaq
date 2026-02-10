import SearchClient from '@/components/movie/search-client';
import { SkeletonGrid } from '@/components/ui/skeleton';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Search Movies',
  description: 'Search for movies by title on Movie Discovery App.',
  openGraph: {
    title: 'Search Movies | Movie Discovery App',
    description: 'Search for movies by title on Movie Discovery App.',
  },
};

const Search = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <Suspense fallback={<SkeletonGrid count={12} />}>
        <SearchClient />
      </Suspense>
    </div>
  );
};

export default Search;
