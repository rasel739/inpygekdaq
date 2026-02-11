import { describe, it, expect } from 'vitest';
import generatePageNumbers from '@/utils/pagination.utils';

describe('generatePageNumbers', () => {
  describe('small page counts (total ≤ 7)', () => {
    it('returns all pages for total = 1', () => {
      expect(generatePageNumbers(1, 1)).toEqual([1]);
    });

    it('returns all pages for total = 5', () => {
      expect(generatePageNumbers(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it('returns all pages for total = 7', () => {
      expect(generatePageNumbers(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });
  });

  describe('large page counts', () => {
    it('shows ellipsis after page 1 when current page is far from start', () => {
      const pages = generatePageNumbers(10, 50);
      expect(pages[0]).toBe(1);
      expect(pages[1]).toBe('...');
      expect(pages).toContain(10);
      expect(pages[pages.length - 1]).toBe(50);
    });

    it('shows ellipsis before last page when current is far from end', () => {
      const pages = generatePageNumbers(5, 50);
      expect(pages).toContain('...');
      expect(pages[pages.length - 1]).toBe(50);
    });

    it('shows both ellipses when current is in the middle', () => {
      const pages = generatePageNumbers(25, 50);
      expect(pages[0]).toBe(1);
      expect(pages[1]).toBe('...');
      expect(pages[pages.length - 2]).toBe('...');
      expect(pages[pages.length - 1]).toBe(50);
    });

    it('does not show leading ellipsis when current is near start', () => {
      const pages = generatePageNumbers(2, 50);
      expect(pages[0]).toBe(1);
      expect(pages[1]).not.toBe('...');
    });

    it('does not show trailing ellipsis when current is near end', () => {
      const pages = generatePageNumbers(49, 50);
      expect(pages[pages.length - 1]).toBe(50);
      expect(pages[pages.length - 2]).not.toBe('...');
    });

    it('always includes first and last page', () => {
      for (const current of [1, 5, 25, 48, 50]) {
        const pages = generatePageNumbers(current, 50);
        expect(pages[0]).toBe(1);
        expect(pages[pages.length - 1]).toBe(50);
      }
    });

    it('includes the current page in the result', () => {
      for (const current of [1, 10, 25, 49, 50]) {
        const pages = generatePageNumbers(current, 50);
        expect(pages).toContain(current);
      }
    });
  });

  describe('edge cases', () => {
    it('handles current = 1 with large total', () => {
      const pages = generatePageNumbers(1, 100);
      expect(pages[0]).toBe(1);
      expect(pages).toContain(2);
    });

    it('handles current = last page with large total', () => {
      const pages = generatePageNumbers(100, 100);
      expect(pages[pages.length - 1]).toBe(100);
      expect(pages).toContain(99);
    });
  });
});
