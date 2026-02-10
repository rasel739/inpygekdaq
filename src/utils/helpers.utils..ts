import { IMAGE_BASE_URL } from '@/constants/movie.constants';
import { BackdropSize, PosterSize, ProfileSize } from '@/types/helpers.type';
import { Movie, StoredMovie } from '@/types/movie.type';

export const getBackdropUrl = (path: string | null, size: BackdropSize = 'w1280'): string => {
  if (!path) return '/placeholder-backdrop.svg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getPosterUrl = (path: string | null, size: PosterSize = 'w500'): string => {
  if (!path) return '/placeholder-poster.svg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const getYear = (dateString: string): string => {
  if (!dateString) return 'Unknown';
  return new Date(dateString).getFullYear().toString();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export const getRatingColor = (rating: number): string => {
  if (rating >= 7.5) return 'text-green-500';
  if (rating >= 5) return 'text-yellow-500';
  return 'text-red-500';
};

export const movieToStoredMovie = (
  movie:
    | Movie
    | {
        id: number;
        title: string;
        poster_path: string | null;
        vote_average: number;
        release_date: string;
      }
): StoredMovie => {
  return {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    release_date: movie.release_date,
    addedAt: Date.now(),
  };
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatRuntime = (minutes: number): string => {
  if (!minutes) return 'Unknown';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

export const getProfileUrl = (path: string | null, size: ProfileSize = 'w185'): string => {
  if (!path) return '/placeholder-profile.svg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getRatingBgColor = (rating: number): string => {
  if (rating >= 7.5) return 'bg-green-500';
  if (rating >= 5) return 'bg-yellow-500';
  return 'bg-red-500';
};
