import { SkeletonCarousel } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className='min-h-screen'>
      {/* Hero skeleton */}
      <div className='h-125 w-full animate-pulse bg-gray-800 md:h-150' />

      <div className='container mx-auto px-4 py-8'>
        {/* Top Rated skeleton */}
        <SkeletonCarousel />

        {/* Genres skeleton */}
        <div className='py-8'>
          <div className='mb-6 h-8 w-48 animate-pulse rounded bg-gray-700' />
          <div className='flex flex-wrap gap-3'>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className='h-10 w-24 animate-pulse rounded-full bg-gray-700' />
            ))}
          </div>
        </div>

        {/* Genre sections skeleton */}
        <SkeletonCarousel />
        <SkeletonCarousel />
      </div>
    </div>
  );
};

export default Loading;
