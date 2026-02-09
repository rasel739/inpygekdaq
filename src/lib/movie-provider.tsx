'use client';
import { useLocalStorage } from '@/hooks/useLocalStroage';
import { StoredMovie } from '@/types/movie.type';
import { movieToStoredMovie } from '@/utils/helpers.utils.';
import { createContext, ReactNode, useCallback, useContext, useMemo } from 'react';

const MAX_RECENTLY_VIEWED = 20;

interface MovieContextType {
  // Recently Viewed
  recentlyViewed: StoredMovie[];
  addToRecentlyViewed: (movie: StoredMovie | Parameters<typeof movieToStoredMovie>[0]) => void;
  clearRecentlyViewed: () => void;

  // Watch Later
  watchLater: StoredMovie[];
  addToWatchLater: (movie: StoredMovie | Parameters<typeof movieToStoredMovie>[0]) => void;
  removeFromWatchLater: (movieId: number) => void;
  isInWatchLater: (movieId: number) => boolean;
  toggleWatchLater: (movie: StoredMovie | Parameters<typeof movieToStoredMovie>[0]) => void;
  clearWatchLater: () => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage<StoredMovie[]>('recentlyViewed', []);
  const [watchLater, setWatchLater] = useLocalStorage<StoredMovie[]>('watchLater', []);

  // Recently Viewed functions
  const addToRecentlyViewed = useCallback(
    (movie: StoredMovie | Parameters<typeof movieToStoredMovie>[0]) => {
      const storedMovie = 'addedAt' in movie ? movie : movieToStoredMovie(movie);

      setRecentlyViewed((prev) => {
        // Remove if already exists
        const filtered = prev.filter((m) => m.id !== storedMovie.id);
        // Add to beginning and limit
        const updated = [{ ...storedMovie, addedAt: Date.now() }, ...filtered];
        return updated.slice(0, MAX_RECENTLY_VIEWED);
      });
    },
    [setRecentlyViewed]
  );

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
  }, [setRecentlyViewed]);

  // Watch Later functions
  const addToWatchLater = useCallback(
    (movie: StoredMovie | Parameters<typeof movieToStoredMovie>[0]) => {
      const storedMovie = 'addedAt' in movie ? movie : movieToStoredMovie(movie);

      setWatchLater((prev) => {
        // Don't add if already exists
        if (prev.some((m) => m.id === storedMovie.id)) return prev;
        return [{ ...storedMovie, addedAt: Date.now() }, ...prev];
      });
    },
    [setWatchLater]
  );

  const removeFromWatchLater = useCallback(
    (movieId: number) => {
      setWatchLater((prev) => prev.filter((m) => m.id !== movieId));
    },
    [setWatchLater]
  );

  const isInWatchLater = useCallback(
    (movieId: number) => {
      return watchLater.some((m) => m.id === movieId);
    },
    [watchLater]
  );

  const toggleWatchLater = useCallback(
    (movie: StoredMovie | Parameters<typeof movieToStoredMovie>[0]) => {
      const movieId = movie.id;
      if (isInWatchLater(movieId)) {
        removeFromWatchLater(movieId);
      } else {
        addToWatchLater(movie);
      }
    },
    [isInWatchLater, addToWatchLater, removeFromWatchLater]
  );

  const clearWatchLater = useCallback(() => {
    setWatchLater([]);
  }, [setWatchLater]);

  const value = useMemo(
    () => ({
      recentlyViewed,
      addToRecentlyViewed,
      clearRecentlyViewed,
      watchLater,
      addToWatchLater,
      removeFromWatchLater,
      isInWatchLater,
      toggleWatchLater,
      clearWatchLater,
    }),
    [
      recentlyViewed,
      addToRecentlyViewed,
      clearRecentlyViewed,
      watchLater,
      addToWatchLater,
      removeFromWatchLater,
      isInWatchLater,
      toggleWatchLater,
      clearWatchLater,
    ]
  );

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};
