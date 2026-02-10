import Logo from '@/components/shared/logo';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center px-4 text-center'>
      <div className='mb-6 rounded-full bg-gray-800 p-8'>
        <Logo />
      </div>
      <h1 className='mb-2 text-4xl font-bold text-white'>404</h1>
      <h2 className='mb-4 text-xl text-gray-400'>Page Not Found</h2>
      <p className='mb-8 max-w-md text-gray-500'>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href='/'
        className='rounded-full bg-purple-600 px-6 py-3 font-semibold text-white
                   transition-colors hover:bg-purple-500'
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
