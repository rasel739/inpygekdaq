'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NAV_LINKS } from '@/constants/navbar.constants';
import { Icons } from '@/lib/icons';
import ThemeToggle from '../shared/theme-toggle';
import SearchField from '../forms/search-field';
import Logo from '../shared/logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur-xl'>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between gap-4'>
          <Logo />
          <div className='hidden md:block'>
            <SearchField />
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden items-center gap-6 md:flex'>
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className='text-sm font-medium text-gray-300 transition-colors hover:text-white'
              >
                <div className='flex items-center gap-1'>
                  <span>
                    {' '}
                    <Icon className='ml-1 h-5 w-5 text-gray-400' />
                  </span>
                  <span>{label}</span>
                </div>
              </Link>
            ))}
          </nav>

          <div className='flex items-center gap-3'>
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='rounded-full bg-gray-800 p-2 md:hidden'
              aria-label='Toggle menu'
            >
              {isMenuOpen ? (
                <Icons.Close className='h-5 w-5 text-white' />
              ) : (
                <Icons.Menu className='h-5 w-5 text-white' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='border-t border-gray-800 py-4 md:hidden'>
            <SearchField setIsMenuOpen={setIsMenuOpen} />

            <nav className='flex flex-col gap-2'>
              {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300
                             transition-colors hover:bg-gray-800 hover:text-white'
                >
                  <Icon className='h-5 w-5' />
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
