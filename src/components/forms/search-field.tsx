import { Icons } from '@/lib/icons';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type SearchFieldProps = {
  setIsMenuOpen?: (isMenuOpen: boolean) => void;
};

const SearchField = ({ setIsMenuOpen }: SearchFieldProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      setIsMenuOpen && setIsMenuOpen(false);
    }
  };
  return (
    <form onSubmit={handleSearch}>
      <div className='relative'>
        <Icons.Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search movies...'
          className='w-full md:w-64 rounded-full bg-gray-800 py-2 pl-10 pr-4 text-sm text-white
                             placeholder-gray-400 outline-none ring-1 ring-gray-700 transition-all
                             focus:ring-2 focus:ring-purple-500'
        />
      </div>
    </form>
  );
};

export default SearchField;
