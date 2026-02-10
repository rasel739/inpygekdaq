'use client';
import generatePageNumbers from '@/utils/pagination.utils';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
}: {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}) => {
  return (
    <>
      {totalPages > 1 && (
        <div className='mt-8 flex items-center justify-center gap-4'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium
                       text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed
                       disabled:opacity-50'
          >
            <ChevronLeftIcon className='h-4 w-4' />
            Previous
          </button>

          {/* Page Numbers */}
          <div className='hidden items-center gap-2 sm:flex'>
            {generatePageNumbers(currentPage, totalPages).map((pageNum, index) =>
              pageNum === '...' ? (
                <span key={`ellipsis-${index}`} className='px-2 text-gray-500'>
                  ...
                </span>
              ) : (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum as number)}
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

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium
                       text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed
                       disabled:opacity-50'
          >
            Next
            <ChevronRightIcon className='h-4 w-4' />
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
