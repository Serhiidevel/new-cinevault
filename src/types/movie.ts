/**
 * Types for The Movie Database (TMDB) API responses.
 * Keeping types in one file makes it easy for juniors to find them.
 */

/** A movie in a list (home page, search results, watchlist cards) */
export type MovieListItem = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

/** Extra fields we only get on the movie details page */
export type MovieDetails = MovieListItem & {
  runtime: number | null;
  genres: { id: number; name: string }[];
};

/** Shape of TMDB "popular movies" and "search" API responses */
export type MoviesApiResponse = {
  results: MovieListItem[];
};
