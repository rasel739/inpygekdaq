'use client';
import Link from 'next/link';
import Logo from '../shared/logo';
import { Copyright } from 'lucide-react';
import { NAV_LINKS } from '@/constants/navbar.constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t border-gray-800 bg-gray-950 py-8'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col items-center gap-6 md:flex-row md:justify-between'>
          <div className='flex flex-col items-center gap-2 md:items-start'>
            <Logo />
            <p className='text-center text-sm text-gray-500 md:text-left '>
              Discover your next favorite movie
            </p>
          </div>

          <div className='flex gap-6'>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='text-sm text-gray-400 transition-colors hover:text-white'
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className='mt-8 border-t border-gray-800 pt-6 text-center'>
          <p className='text-sm text-gray-500'>
            <Copyright className='inline-block mx-1' />
            {currentYear} Movie Discovery App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
