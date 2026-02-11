import WatchLaterClient from '@/components/movie/watch-later-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watch Later',
  description: 'Movies you want to watch later on Movie Discovery App.',
  openGraph: {
    title: 'Watch Later | Movie Discovery App',
    description: 'Movies you want to watch later on Movie Discovery App.',
  },
};
const WatchLater = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='mb-2 text-3xl font-bold  md:text-4xl'>Watch Later</h1>
        <p className='text-gray-400'>Movies saved for later viewing</p>
      </div>

      <WatchLaterClient />
    </div>
  );
};

export default WatchLater;
