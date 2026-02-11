'use client';

import generatePageNumbers from '@/utils/pagination.utils';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from '../ui/button';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: 'simple' | 'numbers';
  maxPages?: number;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'numbers',
  maxPages = 500,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const lastPage = Math.min(totalPages, maxPages);

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === lastPage;

  return (
    <div className='mt-8 flex items-center justify-center gap-4'>
      {/* Previous */}

      <Button
        variant='secondary'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isPrevDisabled}
      >
        <ChevronLeftIcon className='h-4 w-4' />
        Previous
      </Button>

      {/* Middle Section */}
      {variant === 'numbers' ? (
        <div className='hidden items-center gap-2 sm:flex'>
          {generatePageNumbers(currentPage, lastPage).map((pageNum, index) =>
            pageNum === '...' ? (
              <span key={`ellipsis-${index}`} className='px-2 text-gray-500'>
                ...
              </span>
            ) : (
              <Button
                key={pageNum}
                variant='pagination'
                active={pageNum === currentPage}
                onClick={() => onPageChange(pageNum as number)}
              >
                {pageNum}
              </Button>
            )
          )}
        </div>
      ) : (
        <span className='text-gray-400'>
          Page {currentPage} of {lastPage}
        </span>
      )}

      {/* Next */}

      <Button
        variant='secondary'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isNextDisabled}
      >
        <ChevronRightIcon className='h-4 w-4' />
        Next
      </Button>
    </div>
  );
};

export default Pagination;
