'use client';

import { Icons } from '@/lib/icons';

import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='rounded-full bg-gray-800 p-2 transition-colors hover:bg-gray-700
                 dark:bg-gray-700 dark:hover:bg-gray-600'
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Icons.Light className='h-5 w-5 text-yellow-400' />
      ) : (
        <Icons.Dark className='h-5 w-5 text-gray-300' />
      )}
    </button>
  );
};

export default ThemeToggle;
