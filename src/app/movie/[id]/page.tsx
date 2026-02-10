import RecentlyViewTracker from '@/components/movie/recently-view-tracker';
import MovieCarousel from '@/components/ui/movie-carousel';
import { getGenres, getMovieDetails, getSimilarMovies } from '@/services/tmdb';
import {
  formatDate,
  formatRating,
  formatRuntime,
  getBackdropUrl,
  getPosterUrl,
  getProfileUrl,
  getRatingBgColor,
  getYear,
} from '@/utils/helpers.utils.';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const movie = await getMovieDetails(parseInt(id));
    return {
      title: movie.title,
      description: movie.overview,
      openGraph: {
        title: `${movie.title} | Movie Discovery App`,
        description: movie.overview,
        images: movie.backdrop_path ? [getBackdropUrl(movie.backdrop_path, 'w1280')] : [],
      },
    };
  } catch {
    return { title: 'Movie Not Found' };
  }
}

const Movie = async ({ params }: MoviePageProps) => {
  const { id } = await params;
  const movieId = parseInt(id);

  let movie;
  try {
    movie = await getMovieDetails(movieId);
  } catch {
    notFound();
  }

  const [similarMoviesData] = await Promise.all([getSimilarMovies(movieId), getGenres()]);

  const cast = movie.credits?.cast?.slice(0, 10) || [];
  const director = movie.credits?.crew?.find((c) => c.job === 'Director');
  return (
    <div className='min-h-screen'>
      <RecentlyViewTracker movie={movie} />

      <section className='relative h-75 w-full md:h-100 lg:h-180'>
        <div className='absolute inset-0'>
          <Image
            src={getBackdropUrl(movie.backdrop_path, 'w1280')}
            alt={movie.title}
            fill
            className='object-cover'
            priority
          />
          <div className='absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/70 to-gray-950/30' />
        </div>
      </section>

      <div className='container mx-auto px-4 mt-52'>
        <div className='-mt-32 flex flex-col gap-8 md:-mt-48 md:flex-row'>
          <div className='mx-auto w-50 shrink-0 md:mx-0 md:w-75'>
            <Image
              src={getPosterUrl(movie.poster_path, 'w500')}
              alt={movie.title}
              width={300}
              height={450}
              className='rounded-xl shadow-2xl'
              priority
            />
          </div>

          <div className='flex-1 py-4 md:py-8'>
            <h1 className='mb-2 text-3xl font-bold  md:text-4xl lg:text-5xl'>
              {movie.title}
              <span className='ml-3 text-xl font-normal text-gray-400 md:text-2xl'>
                ({getYear(movie.release_date)})
              </span>
            </h1>

            {movie.tagline && <p className='mb-4 text-lg italic text-gray-400'>{movie.tagline}</p>}

            <div className='mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-300'>
              <div className='flex items-center gap-2'>
                <div
                  className={`flex items-center gap-1 rounded-lg px-2 py-1 ${getRatingBgColor(movie.vote_average)}`}
                >
                  <svg className='h-4 w-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                  <span className='font-bold text-white'>{formatRating(movie.vote_average)}</span>
                </div>
                <span className='text-gray-500'>({movie.vote_count.toLocaleString()} votes)</span>
              </div>

              <span>{formatDate(movie?.release_date)}</span>

              {movie.runtime && (
                <span className='flex items-center gap-1'>
                  <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  {formatRuntime(movie.runtime)}
                </span>
              )}
            </div>

            <div className='mb-6 flex flex-wrap gap-2'>
              {movie.genres.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/genre/${genre.id}`}
                  className='rounded-full bg-purple-600/20 px-3 py-1 text-sm font-medium text-purple-400
                             transition-colors hover:bg-purple-600 hover:text-white'
                >
                  {genre.name}
                </Link>
              ))}
            </div>

            <div className='mb-6'>
              <h2 className='mb-2 text-xl font-semibold '>Overview</h2>
              <p className='  leading-relaxed'>{movie.overview || 'No overview available.'}</p>
            </div>

            {director && (
              <div className='mb-6'>
                <h3 className='text-sm font-medium text-gray-400'>Director</h3>
                <p>{director.name}</p>
              </div>
            )}
          </div>
        </div>

        {cast?.length > 0 && (
          <section className='mt-12'>
            <h2 className='mb-6 text-2xl font-bold text-white'>Cast</h2>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
              {cast?.map((person) => (
                <div
                  key={person.id}
                  className='overflow-hidden rounded-xl bg-gray-800/50 transition-transform hover:scale-105'
                >
                  <div className='relative aspect-2/3'>
                    <Image
                      src={getProfileUrl(person.profile_path, 'w185')}
                      alt={person.name}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div className='p-3'>
                    <p className='font-medium text-white line-clamp-1'>{person.name}</p>
                    <p className='text-sm text-gray-300 line-clamp-1'>{person.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {similarMoviesData?.results.length > 0 && (
          <section className='mt-12 pb-8'>
            <MovieCarousel
              movies={similarMoviesData?.results.slice(0, 10)}
              title='Similar Movies'
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default Movie;
