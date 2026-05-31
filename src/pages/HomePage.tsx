import { useEffect, useMemo, useState } from "react";
import { Clapperboard } from "lucide-react";
import MovieGrid from "../components/movies/MovieGrid";
import SearchBar from "../components/movies/SearchBar";
import EmptyState from "../components/ui/EmptyState";
import ErrorMessage from "../components/ui/ErrorMessage";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import type { MovieListItem } from "../types/movie";
import { fetchPopularMovies, searchMovies } from "../utils/api";

/**
 * Home page — shows popular movies and lets users search.
 *
 * State we track:
 * - movies: list from the API
 * - searchQuery: what the user typed
 * - isLoading / error: fetch status
 */
function HomePage() {
  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load popular movies once when the page mounts
  useEffect(() => {
    let cancelled = false;

    async function loadPopular() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchPopularMovies();
        if (!cancelled) {
          setMovies(data.results);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadPopular();

    // Cleanup: if user leaves the page before fetch finishes, ignore the result
    return () => {
      cancelled = true;
    };
  }, []);

  // When user types a search, fetch matching movies (with a small delay)
  useEffect(() => {
    const trimmed = searchQuery.trim();

    // Empty search → reload popular movies
    if (trimmed.length === 0) {
      let cancelled = false;

      async function reloadPopular() {
        setIsLoading(true);
        setError(null);
        try {
          const data = await fetchPopularMovies();
          if (!cancelled) setMovies(data.results);
        } catch (err) {
          if (!cancelled) {
            setError(err instanceof Error ? err.message : "Something went wrong");
          }
        } finally {
          if (!cancelled) setIsLoading(false);
        }
      }

      reloadPopular();
      return () => {
        cancelled = true;
      };
    }

    // Wait 400ms after typing stops — avoids calling API on every keystroke
    const timeoutId = window.setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await searchMovies(trimmed);
        setMovies(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Search failed");
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [searchQuery]);

  // useMemo: only recalculate the heading when searchQuery changes
  const pageTitle = useMemo(() => {
    return searchQuery.trim()
      ? `Results for "${searchQuery.trim()}"`
      : "Popular Movies";
  }, [searchQuery]);

  if (isLoading && movies.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Discover Films</h1>
        <p className="text-zinc-400">
          Browse trending movies or search by title. Save favorites to your watchlist.
        </p>
      </section>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {error && <ErrorMessage message={error} />}

      <h2 className="text-xl font-semibold text-zinc-200">{pageTitle}</h2>

      {isLoading && <LoadingSpinner />}

      {!isLoading && movies.length === 0 && (
        <EmptyState
          icon={<Clapperboard className="h-12 w-12" />}
          title="No movies found"
          message="Try a different search term or check your API key in the .env file."
        />
      )}

      {!isLoading && movies.length > 0 && <MovieGrid movies={movies} />}
    </div>
  );
}

export default HomePage;
