import { describe, it, expect } from 'vitest';
import {
  formatRating,
  getYear,
  truncateText,
  getRatingColor,
  getRatingBgColor,
  formatDate,
  formatRuntime,
  getBackdropUrl,
  getPosterUrl,
  getProfileUrl,
  movieToStoredMovie,
  getGridClass,
} from '@/utils/helpers.utils.';

describe('helpers.utils', () => {
  describe('formatRating', () => {
    it('formats a whole number rating to one decimal place', () => {
      expect(formatRating(8)).toBe('8.0');
    });

    it('formats a decimal rating to one decimal place', () => {
      expect(formatRating(7.456)).toBe('7.5');
    });

    it('formats zero correctly', () => {
      expect(formatRating(0)).toBe('0.0');
    });

    it('formats a perfect 10', () => {
      expect(formatRating(10)).toBe('10.0');
    });
  });

  describe('getYear', () => {
    it('extracts year from a valid date string', () => {
      expect(getYear('2024-07-15')).toBe('2024');
    });

    it('returns "Unknown" for an empty string', () => {
      expect(getYear('')).toBe('Unknown');
    });

    it('handles ISO date format', () => {
      expect(getYear('2010-07-16T00:00:00.000Z')).toBe('2010');
    });
  });

  describe('truncateText', () => {
    it('returns full text when shorter than maxLength', () => {
      expect(truncateText('Hello', 10)).toBe('Hello');
    });

    it('truncates and adds ellipsis when text exceeds maxLength', () => {
      const result = truncateText('This is a very long description', 15);
      expect(result).toBe('This is a very...');
      expect(result.length).toBeLessThanOrEqual(18);
    });

    it('returns full text when exactly maxLength', () => {
      expect(truncateText('12345', 5)).toBe('12345');
    });
  });

  describe('getRatingColor', () => {
    it('returns green for ratings >= 7.5', () => {
      expect(getRatingColor(7.5)).toBe('text-green-500');
      expect(getRatingColor(9.2)).toBe('text-green-500');
    });

    it('returns yellow for ratings >= 5 and < 7.5', () => {
      expect(getRatingColor(5)).toBe('text-yellow-500');
      expect(getRatingColor(6.8)).toBe('text-yellow-500');
    });

    it('returns red for ratings < 5', () => {
      expect(getRatingColor(4.9)).toBe('text-red-500');
      expect(getRatingColor(0)).toBe('text-red-500');
    });
  });

  describe('getRatingBgColor', () => {
    it('returns green bg for high ratings', () => {
      expect(getRatingBgColor(8.5)).toBe('bg-green-500');
    });

    it('returns yellow bg for medium ratings', () => {
      expect(getRatingBgColor(6.0)).toBe('bg-yellow-500');
    });

    it('returns red bg for low ratings', () => {
      expect(getRatingBgColor(3.0)).toBe('bg-red-500');
    });
  });

  describe('formatDate', () => {
    it('formats a date string to US locale', () => {
      const result = formatDate('2024-07-15');
      expect(result).toContain('July');
      expect(result).toContain('15');
      expect(result).toContain('2024');
    });

    it('returns "Unknown" for an empty string', () => {
      expect(formatDate('')).toBe('Unknown');
    });
  });

  describe('formatRuntime', () => {
    it('formats hours and minutes correctly', () => {
      expect(formatRuntime(148)).toBe('2h 28m');
    });

    it('formats exact hours', () => {
      expect(formatRuntime(120)).toBe('2h');
    });

    it('formats minutes only (less than 60)', () => {
      expect(formatRuntime(45)).toBe('45m');
    });

    it('returns "Unknown" for 0 or falsy values', () => {
      expect(formatRuntime(0)).toBe('Unknown');
    });
  });

  describe('getBackdropUrl', () => {
    it('constructs backdrop URL with default size', () => {
      const url = getBackdropUrl('/abc123.jpg');
      expect(url).toContain('/w1280/abc123.jpg');
    });

    it('constructs backdrop URL with custom size', () => {
      const url = getBackdropUrl('/abc123.jpg', 'w780');
      expect(url).toContain('/w780/abc123.jpg');
    });

    it('returns placeholder when path is null', () => {
      expect(getBackdropUrl(null)).toBe('/placeholder-backdrop.svg');
    });
  });

  describe('getPosterUrl', () => {
    it('constructs poster URL with default size', () => {
      const url = getPosterUrl('/poster.jpg');
      expect(url).toContain('/w500/poster.jpg');
    });

    it('returns placeholder when path is null', () => {
      expect(getPosterUrl(null)).toBe('/placeholder-poster.svg');
    });
  });

  describe('getProfileUrl', () => {
    it('constructs profile URL with default size', () => {
      const url = getProfileUrl('/profile.jpg');
      expect(url).toContain('/w185/profile.jpg');
    });

    it('returns placeholder when path is null', () => {
      expect(getProfileUrl(null)).toBe('/placeholder-profile.svg');
    });
  });

  describe('movieToStoredMovie', () => {
    it('converts a Movie object to StoredMovie with addedAt timestamp', () => {
      const movie = {
        id: 550,
        title: 'Fight Club',
        poster_path: '/poster.jpg',
        vote_average: 8.4,
        release_date: '1999-10-15',
      };

      const stored = movieToStoredMovie(movie);

      expect(stored.id).toBe(550);
      expect(stored.title).toBe('Fight Club');
      expect(stored.poster_path).toBe('/poster.jpg');
      expect(stored.vote_average).toBe(8.4);
      expect(stored.release_date).toBe('1999-10-15');
      expect(stored.addedAt).toBeTypeOf('number');
      expect(stored.addedAt).toBeGreaterThan(0);
    });
  });

  describe('getGridClass', () => {
    it('returns correct class for 2 columns', () => {
      expect(getGridClass(2)).toBe('grid-cols-2');
    });

    it('returns correct class for 3 columns', () => {
      expect(getGridClass(3)).toBe('grid-cols-2 sm:grid-cols-3');
    });

    it('returns correct class for 4 columns', () => {
      expect(getGridClass(4)).toBe('grid-cols-2 sm:grid-cols-3 md:grid-cols-4');
    });

    it('returns correct class for 5 columns', () => {
      expect(getGridClass(5)).toBe('grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5');
    });

    it('returns correct class for 6 columns', () => {
      expect(getGridClass(6)).toBe(
        'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
      );
    });

    it('returns default (6-col) class for "auto"', () => {
      expect(getGridClass('auto')).toBe(
        'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
      );
    });
  });
});
