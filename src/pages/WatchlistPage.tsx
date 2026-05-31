import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import MovieGrid from "../components/movies/MovieGrid";
import EmptyState from "../components/ui/EmptyState";
import type { MovieListItem } from "../types/movie";
import { getWatchlist, removeFromWatchlist } from "../utils/storage";

/**
 * Watchlist page — movies saved in localStorage.
 *
 * We reload from localStorage when the page mounts.
 * (A more advanced app might use Context to sync instantly across pages.)
 */
function WatchlistPage() {
  const [movies, setMovies] = useState<MovieListItem[]>([]);

  useEffect(() => {
    setMovies(getWatchlist());
  }, []);

  function handleClearAll() {
    // Remove each movie one by one using our existing helper
    movies.forEach((movie) => removeFromWatchlist(movie.id));
    setMovies([]);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">My Watchlist</h1>
          <p className="text-zinc-400">
            {movies.length} {movies.length === 1 ? "movie" : "movies"} saved on
            this device.
          </p>
        </div>

        {movies.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-red-500/50 hover:text-red-300"
          >
            Clear all
          </button>
        )}
      </div>

      {movies.length === 0 ? (
        <EmptyState
          icon={<Heart className="h-12 w-12" />}
          title="Your watchlist is empty"
          message="Open a movie and tap “Add to Watchlist” to save it here."
        />
      ) : (
        <>
          <MovieGrid movies={movies} />
          <p className="text-center text-sm text-zinc-500">
            Tip: open a movie to remove it from the watchlist, or use{" "}
            <Link to="/" className="text-amber-400 hover:underline">
              Discover
            </Link>{" "}
            to find more.
          </p>
        </>
      )}
    </div>
  );
}

export default WatchlistPage;
