'use client';
import { Movie } from '@/types/movie.type';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useRef } from 'react';
import MovieCard from './movie-card';
import { Button } from './button';

interface MovieCarouselProps {
  movies: Movie[];
  title: string;
  genreId?: number;
}

const MovieCarousel = ({ movies, title, genreId }: MovieCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className='relative py-4'>
      {/* Header */}
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <h2 className='text-xl font-bold  md:text-2xl'>{title}</h2>
          {genreId && (
            <a
              href={`/genre/${genreId}`}
              className='text-sm text-purple-400 transition-colors hover:text-purple-300'
            >
              <span className='flex items-center gap-1'>
                {' '}
                See all <ChevronRightIcon className='ml-1 h-4 w-4' />
              </span>
            </a>
          )}
        </div>

        {/* Navigation Arrows */}
        <div className='hidden gap-2 md:flex'>
          <Button
            variant='icon'
            onClick={() => scroll('left')}
            aria-label='Scroll left'
            className='hover:bg-purple-600'
          >
            <ChevronLeftIcon className='h-5 w-5 text-white' />
          </Button>

          <Button
            variant='icon'
            onClick={() => scroll('right')}
            aria-label='Scroll right'
            className='hover:bg-purple-600'
          >
            <ChevronRightIcon className='h-5 w-5 text-white' />
          </Button>
        </div>
      </div>

      {/* Carousel Container */}
      <div ref={scrollRef} className='scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth pb-4'>
        {movies?.map((movie, index) => (
          <div key={movie.id} className='w-35 shrink-0 sm:w-40 md:w-45'>
            <MovieCard movie={movie} priority={index < 5} />
          </div>
        ))}
      </div>

      {/* Gradient Overlays for scroll indication */}

      <div className='pointer-events-none absolute bottom-0 left-0 top-0 hidden w-8 bg-linear-to-r from-gray-950 to-transparent md:block' />
      <div className='pointer-events-none absolute bottom-0 right-0 top-0 hidden w-8 bg-linear-to-l from-gray-950 to-transparent md:block' />
    </section>
  );
};

export default MovieCarousel;
