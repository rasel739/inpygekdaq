import { Movie } from '@/types/movie.type';
import {
  formatRating,
  getBackdropUrl,
  getPosterUrl,
  getYear,
  truncateText,
} from '@/utils/helpers.utils.';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = ({ movie }: { movie: Movie }) => {
  return (
    <section className='relative h-125 w-full overflow-hidden md:h-150'>
      <div className='absolute inset-0'>
        <Image
          src={getBackdropUrl(movie.backdrop_path, 'w1280')}
          alt={movie.title}
          fill
          className='object-cover'
          priority
        />

        <div className='absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/60 to-transparent' />
        <div className='absolute inset-0 bg-linear-to-r from-gray-950 via-transparent to-transparent' />
      </div>

      <div className='container relative mx-auto flex h-full items-end px-4 pb-12 md:pb-16'>
        <div className='flex flex-col gap-4 md:flex-row md:items-end md:gap-8'>
          <Link href={`/movie/${movie.id}`} className='hidden md:block'>
            <Image
              src={getPosterUrl(movie.poster_path, 'w342')}
              alt={movie.title}
              width={200}
              height={300}
              className='rounded-xl shadow-2xl transition-transform hover:scale-105'
              priority
            />
          </Link>

          <div className='max-w-2xl'>
            <span className='mb-2 inline-block rounded-full bg-purple-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white'>
              Featured
            </span>
            <h1 className='mb-2 text-3xl font-bold text-white md:text-5xl'>{movie.title}</h1>
            <div className='mb-4 flex items-center gap-4 text-sm text-gray-300'>
              <span className='flex items-center gap-1'>
                <svg className='h-4 w-4 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
                {formatRating(movie.vote_average)}
              </span>
              <span>{getYear(movie.release_date)}</span>
            </div>
            <p className='mb-6 text-gray-300 line-clamp-3 md:line-clamp-none'>
              {truncateText(movie.overview, 250)}
            </p>
            <Link
              href={`/movie/${movie.id}`}
              className='inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 font-semibold text-white transition-all hover:bg-purple-500 hover:scale-105'
            >
              <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
                  clipRule='evenodd'
                />
              </svg>
              View Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
