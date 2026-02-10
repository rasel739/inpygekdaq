import React from 'react';

const Sort = ({
  currentSort,
  sortOptions,
  handleSortChange,
  currentPage,
  totalPages,
}: {
  currentSort: string;
  sortOptions: { value: string; label: string }[];
  handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  currentPage: number;
  totalPages: number;
}) => {
  return (
    <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex items-center gap-3'>
        <label htmlFor='sort' className='text-sm text-gray-400'>
          Sort by:
        </label>
        <select
          id='sort'
          value={currentSort}
          onChange={handleSortChange}
          className='rounded-lg bg-gray-800 px-4 py-2 text-sm text-white outline-none
                       ring-1 ring-gray-700 transition-all focus:ring-2 focus:ring-purple-500'
        >
          {sortOptions?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Page Info */}
      <p className='text-sm text-gray-400'>
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};

export default Sort;
