'use client';
import { GenreClientProps } from '@/types/genre.type';
import Sort from '../shared/sort';
import { useRouter, useSearchParams } from 'next/navigation';
import MovieGrid from '../ui/movie-grid';
import Pagination from '../shared/pagination';

const GenreClient = ({
  genreId,
  initialMovies,
  totalPages,
  currentPage,
  currentSort,
  sortOptions,
}: GenreClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    if (key === 'sort') {
      params.set('page', '1');
    }
    router.push(`/genre/${genreId}?${params.toString()}`);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateParams('sort', e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      updateParams('page', newPage.toString());
    }
  };
  return (
    <>
      <Sort
        currentSort={currentSort.value}
        sortOptions={[...sortOptions]}
        handleSortChange={handleSortChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      {/* Movie List */}
      <MovieGrid movies={initialMovies} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        variant='numbers'
      />
    </>
  );
};

export default GenreClient;
