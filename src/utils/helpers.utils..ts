import { IMAGE_BASE_URL } from '@/constants/movie.constants';
import { BackdropSize, PosterSize } from '@/types/helpers.type';

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
