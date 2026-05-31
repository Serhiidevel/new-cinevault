import type { MovieListItem } from "../types/movie";

/** Key used in localStorage — one place so we never typo it */
const WATCHLIST_KEY = "cinevault-watchlist";

/**
 * Read the watchlist from localStorage.
 * Returns an empty array if nothing is saved yet (or data is invalid).
 */
export function getWatchlist(): MovieListItem[] {
  try {
    const saved = localStorage.getItem(WATCHLIST_KEY);
    if (!saved) return [];
    return JSON.parse(saved) as MovieListItem[];
  } catch {
    // If JSON is broken, start fresh instead of crashing the app
    return [];
  }
}

/** Save the full watchlist array to localStorage */
export function saveWatchlist(movies: MovieListItem[]): void {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(movies));
}

/** Check if a movie is already in the watchlist */
export function isInWatchlist(movieId: number): boolean {
  return getWatchlist().some((movie) => movie.id === movieId);
}

/** Add a movie (does nothing if it's already there) */
export function addToWatchlist(movie: MovieListItem): void {
  const current = getWatchlist();
  if (current.some((item) => item.id === movie.id)) return;
  saveWatchlist([...current, movie]);
}

/** Remove a movie by id */
export function removeFromWatchlist(movieId: number): void {
  const updated = getWatchlist().filter((movie) => movie.id !== movieId);
  saveWatchlist(updated);
}
