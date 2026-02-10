import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import SearchInput from '../ui/search-input';

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
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder='Search movies...'
        width='w-full md:w-96'
        iconSize='h-4 w-4'
        paddingY='py-2'
        paddingLeft='pl-10'
        rounded='rounded-full'
      />
    </form>
  );
};

export default SearchField;
