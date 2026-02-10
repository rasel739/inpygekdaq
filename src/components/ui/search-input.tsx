'use client';

import { Icons } from '@/lib/icons';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: string;
  iconSize?: string;
  paddingY?: string;
  paddingLeft?: string;
  rounded?: string;
  autoFocus?: boolean;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search...',
  width = 'w-full',
  iconSize = 'h-4 w-4',
  paddingY = 'py-2',
  paddingLeft = 'pl-10',
  rounded = 'rounded-full',
  autoFocus = false,
}: SearchInputProps) => {
  return (
    <div className={`relative ${width}`}>
      <Icons.Search
        className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ${iconSize}`}
      />
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`w-full ${rounded} bg-gray-800 ${paddingY} ${paddingLeft} pr-4
          text-sm text-white placeholder-gray-400 outline-none
          ring-1 ring-gray-700 transition-all
          focus:ring-2 focus:ring-purple-500`}
      />
    </div>
  );
};

export default SearchInput;
