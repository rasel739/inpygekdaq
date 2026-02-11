'use client';
import { Icons } from '@/lib/icons';
import { useMovies } from '@/lib/movie-provider';
import { Movie, StoredMovie } from '@/types/movie.type';
import { formatRating, getPosterUrl, getRatingColor, getYear } from '@/utils/helpers.utils.';
import { BookmarkCheckIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './button';

interface MovieCardProps {
  movie: Movie | StoredMovie;
  showWatchLater?: boolean;
  priority?: boolean;
}

const MovieCard = ({ movie, showWatchLater = true, priority = false }: MovieCardProps) => {
  const { isInWatchLater, toggleWatchLater } = useMovies();
  const inWatchLater = isInWatchLater(movie.id);

  const handleWatchLaterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatchLater(movie);
  };
  return (
    <Link
      href={`/movie/${movie.id}`}
      className='group relative flex flex-col overflow-hidden rounded-xl bg-gray-900/50
                 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20
                 dark:bg-gray-800/50'
    >
      {/* Poster Image */}
      <div className='relative aspect-2/3 w-full overflow-hidden'>
        <Image
          src={getPosterUrl(movie.poster_path, 'w500')}
          alt={movie.title}
          fill
          sizes='(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw'
          className='object-cover transition-transform duration-300 group-hover:scale-110'
          priority={priority}
        />

        {/* Gradient Overlay */}
        <div
          className='absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent
                        opacity-0 transition-opacity duration-300 group-hover:opacity-100'
        />

        {/* Rating Badge */}
        <div className='absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 backdrop-blur-sm'>
          <svg className='h-3 w-3 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
          </svg>
          <span className={`text-xs font-bold ${getRatingColor(movie.vote_average)}`}>
            {formatRating(movie.vote_average)}
          </span>
        </div>

        {/* Watch Later Button */}
        {showWatchLater && (
          <Button
            variant='ghost'
            onClick={handleWatchLaterClick}
            className='absolute right-2 top-2'
          >
            {inWatchLater ? (
              <BookmarkCheckIcon className='h-4 w-4 text-purple-400' />
            ) : (
              <Icons.Bookmark className='h-4 w-4 text-white' />
            )}
          </Button>
        )}
      </div>

      {/* Info Section */}
      <div className='flex flex-1 flex-col gap-1 p-3'>
        <h3
          className='line-clamp-1 text-sm font-semibold  transition-colors
                       group-hover:text-purple-700'
        >
          {movie.title}
        </h3>
        <span className='text-xs '>{getYear(movie.release_date)}</span>
      </div>
    </Link>
  );
};

export default MovieCard;
