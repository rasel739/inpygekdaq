'use client';

import generatePageNumbers from '@/utils/pagination.utils';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

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
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isPrevDisabled}
        className='flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2
                   text-sm font-medium text-white transition-colors
                   hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50'
      >
        <ChevronLeftIcon className='h-4 w-4' />
        Previous
      </button>

      {/* Middle Section */}
      {variant === 'numbers' ? (
        <div className='hidden items-center gap-2 sm:flex'>
          {generatePageNumbers(currentPage, lastPage).map((pageNum, index) =>
            pageNum === '...' ? (
              <span key={`ellipsis-${index}`} className='px-2 text-gray-500'>
                ...
              </span>
            ) : (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum as number)}
                className={`h-10 w-10 rounded-lg text-sm font-medium transition-colors ${
                  pageNum === currentPage
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {pageNum}
              </button>
            )
          )}
        </div>
      ) : (
        <span className='text-gray-400'>
          Page {currentPage} of {lastPage}
        </span>
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isNextDisabled}
        className='flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2
                   text-sm font-medium text-white transition-colors
                   hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50'
      >
        Next
        <ChevronRightIcon className='h-4 w-4' />
      </button>
    </div>
  );
};

export default Pagination;
