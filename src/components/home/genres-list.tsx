import { Genre } from '@/types/movie.type';
import Link from 'next/link';
import React from 'react';

const GenresList = ({ genres }: { genres: Genre[] }) => {
  return (
    <section className='py-8'>
      <h2 className='mb-6 text-2xl font-bold '>Browse by Genre</h2>
      <div className='flex flex-wrap gap-3'>
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/genre/${genre.id}`}
            className='rounded-full bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300
                       transition-all hover:bg-purple-600 hover:text-white hover:scale-105'
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default GenresList;
