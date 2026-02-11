'use client';

import { useMovieSearch } from '@/hooks/useMovieSearch';
import EmptyState from '../ui/empty-state';
import { SkeletonGrid } from '../ui/skeleton';
import MovieGrid from '../ui/movie-grid';
import ErrorState from '../ui/error-state';
import SearchInput from '../ui/search-input';
import Pagination from '../shared/pagination';

const SearchClient = () => {
  const { state, setQuery, setPage, fetchMovies } = useMovieSearch();

  const { query, results, isLoading, error, totalResults, page, totalPages } = state;

  return (
    <div>
      <div className='mb-8'>
        <h1 className='mb-4 text-3xl font-bold  md:text-4xl'>Search Movies</h1>

        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder='Search for movies...'
          width='max-w-xl'
          iconSize='h-5 w-5'
          paddingY='py-4'
          paddingLeft='pl-12'
          rounded='rounded-xl'
          autoFocus
        />
      </div>

      {query && !isLoading && !error && (
        <p className='mb-6 text-gray-400'>
          {totalResults > 0
            ? `Found ${totalResults.toLocaleString()} results for "${query}"`
            : `No results found for "${query}"`}
        </p>
      )}

      {isLoading && <SkeletonGrid count={12} />}

      {error && <ErrorState message={error} onRetry={() => fetchMovies(query, page)} />}

      {!query && !isLoading && (
        <EmptyState
          icon='search'
          title='Search for movies'
          description="Enter a movie title to find what you're looking for."
        />
      )}

      {query && !isLoading && !error && results.length === 0 && (
        <EmptyState
          icon='search'
          title='No movies found'
          description='Try adjusting your search terms.'
        />
      )}

      {!isLoading && !error && results.length > 0 && (
        <>
          <MovieGrid movies={results} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            variant='simple'
          />
        </>
      )}
    </div>
  );
};

export default SearchClient;
