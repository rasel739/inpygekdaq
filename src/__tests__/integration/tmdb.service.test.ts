import { describe, it, expect } from 'vitest';
import {
  getGenres,
  getTopRatedMovies,
  getPopularMovies,
  discoverMoviesByGenre,
  getMovieDetails,
  getSimilarMovies,
  searchMovies,
  getPopularMoviesByGenre,
} from '@/services/tmdb';

describe('TMDB Service - Real API Integration', () => {
  describe('getGenres', () => {
    it('returns an array of genres from the real API', async () => {
      const genres = await getGenres();

      expect(Array.isArray(genres)).toBe(true);
      expect(genres.length).toBeGreaterThan(0);

      const firstGenre = genres[0];
      expect(firstGenre).toHaveProperty('id');
      expect(firstGenre).toHaveProperty('name');
      expect(typeof firstGenre.id).toBe('number');
      expect(typeof firstGenre.name).toBe('string');
    });

    it('contains well-known genres like Action and Comedy', async () => {
      const genres = await getGenres();
      const genreNames = genres.map((g) => g.name);

      expect(genreNames).toContain('Action');
      expect(genreNames).toContain('Comedy');
      expect(genreNames).toContain('Drama');
    });
  });

  describe('getTopRatedMovies', () => {
    it('returns paginated results from the real API', async () => {
      const data = await getTopRatedMovies(1);

      expect(data).toHaveProperty('page', 1);
      expect(data).toHaveProperty('results');
      expect(data).toHaveProperty('total_pages');
      expect(data).toHaveProperty('total_results');
      expect(Array.isArray(data.results)).toBe(true);
      expect(data.results.length).toBeGreaterThan(0);
    });

    it('returns movies with expected fields', async () => {
      const data = await getTopRatedMovies(1);
      const movie = data.results[0];

      expect(movie).toHaveProperty('id');
      expect(movie).toHaveProperty('title');
      expect(movie).toHaveProperty('vote_average');
      expect(movie).toHaveProperty('overview');
      expect(movie).toHaveProperty('release_date');
      expect(movie.vote_average).toBeGreaterThan(0);
    });

    it('supports pagination (page 2)', async () => {
      const page1 = await getTopRatedMovies(1);
      const page2 = await getTopRatedMovies(2);

      expect(page2.page).toBe(2);
      expect(page2.results[0].id).not.toBe(page1.results[0].id);
    });
  });

  describe('getPopularMovies', () => {
    it('returns popular movies from the real API', async () => {
      const data = await getPopularMovies(1);

      expect(data.results.length).toBeGreaterThan(0);
      expect(data.results[0]).toHaveProperty('title');
      expect(data.results[0]).toHaveProperty('popularity');
      expect(data.results[0].popularity).toBeGreaterThan(0);
    });
  });

  describe('discoverMoviesByGenre', () => {
    it('returns movies for the Action genre (ID 28)', async () => {
      const data = await discoverMoviesByGenre(28, 1, 'popularity.desc');

      expect(data.results.length).toBeGreaterThan(0);
      expect(data.total_results).toBeGreaterThan(0);
    });

    it('supports sorting by vote_average.desc', async () => {
      const data = await discoverMoviesByGenre(28, 1, 'vote_average.desc');

      expect(data.results.length).toBeGreaterThan(0);
    });
  });

  describe('getMovieDetails', () => {
    it('returns full movie details with credits for a known movie (Fight Club = 550)', async () => {
      const movie = await getMovieDetails(550);

      expect(movie.id).toBe(550);
      expect(movie.title).toBe('Fight Club');
      expect(movie).toHaveProperty('overview');
      expect(movie).toHaveProperty('runtime');
      expect(movie).toHaveProperty('genres');
      expect(movie).toHaveProperty('credits');
      expect(Array.isArray(movie.genres)).toBe(true);
      expect(movie.genres.length).toBeGreaterThan(0);
    });

    it('includes cast and crew in credits', async () => {
      const movie = await getMovieDetails(550);

      expect(movie.credits).toHaveProperty('cast');
      expect(movie.credits).toHaveProperty('crew');
      expect(movie.credits.cast.length).toBeGreaterThan(0);

      const firstCast = movie.credits.cast[0];
      expect(firstCast).toHaveProperty('name');
      expect(firstCast).toHaveProperty('character');
    });

    it('throws an error for an invalid movie ID', async () => {
      await expect(getMovieDetails(999999999)).rejects.toThrow();
    });
  });

  describe('getSimilarMovies', () => {
    it('returns similar movies for a known movie (Inception = 27205)', async () => {
      const data = await getSimilarMovies(27205);

      expect(data.results.length).toBeGreaterThan(0);
      expect(data.results[0]).toHaveProperty('title');
    });
  });

  describe('searchMovies', () => {
    it('finds "Inception" when searching by title', async () => {
      const data = await searchMovies('Inception', 1);

      expect(data.results.length).toBeGreaterThan(0);

      const titles = data.results.map((m) => m.title.toLowerCase());
      expect(titles.some((t) => t.includes('inception'))).toBe(true);
    });

    it('returns empty results for a gibberish query', async () => {
      const data = await searchMovies('xyzabc123nonsense999', 1);

      expect(data.results.length).toBe(0);
    });

    it('supports pagination parameter', async () => {
      const data = await searchMovies('the', 1);

      expect(data.page).toBe(1);
      expect(data.total_pages).toBeGreaterThan(1);
    });
  });

  describe('getPopularMoviesByGenre', () => {
    it('returns limited number of popular movies for a genre', async () => {
      const movies = await getPopularMoviesByGenre(28, 5);

      expect(movies.length).toBeLessThanOrEqual(5);
      expect(movies.length).toBeGreaterThan(0);
      expect(movies[0]).toHaveProperty('title');
    });

    it('respects the limit parameter', async () => {
      const movies = await getPopularMoviesByGenre(28, 3);

      expect(movies.length).toBeLessThanOrEqual(3);
    });
  });
});
