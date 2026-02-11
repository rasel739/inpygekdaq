'use client';

import { Icons } from '@/lib/icons';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant='icon'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label='Toggle theme'
    >
      {theme === 'dark' ? (
        <Icons.Light className='h-5 w-5 text-yellow-400' />
      ) : (
        <Icons.Dark className='h-5 w-5 text-gray-300' />
      )}
    </Button>
  );
};

export default ThemeToggle;
