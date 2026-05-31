import type { MovieDetails, MoviesApiResponse } from "../types/movie";

const API_BASE = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

/** Build a poster image URL (TMDB stores only the path, not full URL) */
export function getPosterUrl(posterPath: string | null): string {
  if (!posterPath) {
    return "https://placehold.co/300x450/27272a/a1a1aa?text=No+Poster";
  }
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
}

/** Format release year from "2024-03-15" → "2024" */
export function getReleaseYear(releaseDate: string): string {
  if (!releaseDate) return "—";
  return releaseDate.slice(0, 4);
}

/** Round rating to one decimal, e.g. 7.832 → "7.8" */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

/** Shared fetch helper — adds API key and throws clear errors */
async function fetchFromTmdb<T>(endpoint: string): Promise<T> {
  if (!API_KEY) {
    throw new Error(
      "Missing API key. Copy .env.example to .env and add your TMDB key."
    );
  }

  const url = `${API_BASE}${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

/** Popular movies for the home page */
export function fetchPopularMovies(): Promise<MoviesApiResponse> {
  return fetchFromTmdb<MoviesApiResponse>("/movie/popular");
}

/** Search movies by title */
export function searchMovies(query: string): Promise<MoviesApiResponse> {
  const encoded = encodeURIComponent(query);
  return fetchFromTmdb<MoviesApiResponse>(`/search/movie?query=${encoded}`);
}

/** Full details for one movie */
export function fetchMovieDetails(movieId: number): Promise<MovieDetails> {
  return fetchFromTmdb<MovieDetails>(`/movie/${movieId}`);
}
