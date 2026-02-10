export const SkeletonCard = () => {
  return (
    <div className='animate-pulse overflow-hidden rounded-xl bg-gray-800/50'>
      <div className='aspect-2/3 w-full bg-gray-700' />
      <div className='p-3 space-y-2'>
        <div className='h-4 w-3/4 rounded bg-gray-700' />
        <div className='h-3 w-1/2 rounded bg-gray-700' />
      </div>
    </div>
  );
};

export const SkeletonGrid = ({ count = 12 }: { count?: number }) => {
  return (
    <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:gap-6'>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export const SkeletonCarousel = () => {
  return (
    <div className='py-4'>
      <div className='mb-4 flex items-center gap-3'>
        <div className='h-7 w-40 animate-pulse rounded bg-gray-700' />
        <div className='h-5 w-16 animate-pulse rounded bg-gray-700' />
      </div>
      <div className='flex gap-4 overflow-hidden'>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className='w-45 shrink-0'>
            <SkeletonCard />
          </div>
        ))}
      </div>
    </div>
  );
};

export const SkeletonMovieDetails = () => {
  return (
    <div className='animate-pulse'>
      {/* Backdrop */}
      <div className='h-75 w-full bg-gray-800 md:h-100 lg:h-125' />

      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col gap-8 md:flex-row'>
          {/* Poster */}
          <div className='mx-auto w-50 md:mx-0 md:w-75'>
            <div className='aspect-2/3 w-full rounded-xl bg-gray-700' />
          </div>

          {/* Info */}
          <div className='flex-1 space-y-4'>
            <div className='h-10 w-3/4 rounded bg-gray-700' />
            <div className='h-6 w-1/2 rounded bg-gray-700' />
            <div className='flex gap-2'>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className='h-8 w-20 rounded-full bg-gray-700' />
              ))}
            </div>
            <div className='space-y-2'>
              <div className='h-4 w-full rounded bg-gray-700' />
              <div className='h-4 w-full rounded bg-gray-700' />
              <div className='h-4 w-3/4 rounded bg-gray-700' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonText = ({ width = 'full' }: { width?: 'full' | '3/4' | '1/2' | '1/4' }) => {
  const widthClass = {
    full: 'w-full',
    '3/4': 'w-3/4',
    '1/2': 'w-1/2',
    '1/4': 'w-1/4',
  }[width];

  return <div className={`h-4 ${widthClass} animate-pulse rounded bg-gray-700`} />;
};
