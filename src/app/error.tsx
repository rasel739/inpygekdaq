'use client';
import { FileExclamationPoint } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);
  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center px-4 text-center'>
      <div className='mb-6 rounded-full bg-red-900/30 p-8'>
        <FileExclamationPoint className='h-16 w-16 text-red-500' />
      </div>
      <h1 className='mb-2 text-2xl font-bold text-white'>Something went wrong</h1>
      <p className='mb-8 max-w-md text-gray-400'>
        An error occurred while loading this page. Please try again.
      </p>
      <div className='flex gap-4'>
        <button
          onClick={reset}
          className='rounded-full bg-purple-600 px-6 py-3 font-semibold text-white
                     transition-colors hover:bg-purple-500'
        >
          Try Again
        </button>
        <Link
          href='/'
          className='rounded-full bg-gray-700 px-6 py-3 font-semibold text-white
                     transition-colors hover:bg-gray-600'
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
