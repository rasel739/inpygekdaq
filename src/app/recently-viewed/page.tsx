import ResentlyClient from '@/components/movie/recently-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recently Viewed',
  description: 'Your recently viewed movies on Movie Discovery App.',
  openGraph: {
    title: 'Recently Viewed | Movie Discovery App',
    description: 'Your recently viewed movies on Movie Discovery App.',
  },
};

const RecentlyViewed = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='mb-2 text-3xl font-bold  md:text-4xl'>Recently Viewed</h1>
        <p className='text-gray-400'>Movies you&apos;ve recently looked at</p>
      </div>

      <ResentlyClient />
    </div>
  );
};

export default RecentlyViewed;
