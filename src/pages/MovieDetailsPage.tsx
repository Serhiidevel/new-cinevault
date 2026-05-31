import { useEffect, useState } from "react";
import { ArrowLeft, Clock, Heart, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ErrorMessage from "../components/ui/ErrorMessage";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import type { MovieDetails, MovieListItem } from "../types/movie";
import {
  fetchMovieDetails,
  formatRating,
  getPosterUrl,
  getReleaseYear,
} from "../utils/api";
import {
  addToWatchlist,
  isInWatchlist,
  removeFromWatchlist,
} from "../utils/storage";

/**
 * Single movie page — full info + add/remove watchlist button.
 * useParams reads :movieId from the URL (see App.tsx route).
 */
function MovieDetailsPage() {
  const { movieId } = useParams();
  const numericId = Number(movieId);

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!numericId || Number.isNaN(numericId)) {
      setError("Invalid movie id in the URL.");
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function loadDetails() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchMovieDetails(numericId);
        if (!cancelled) {
          setMovie(data);
          setSaved(isInWatchlist(data.id));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load movie");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadDetails();

    return () => {
      cancelled = true;
    };
  }, [numericId]);

  function handleWatchlistClick() {
    if (!movie) return;

    // MovieListItem is a subset of MovieDetails — safe to pass to storage
    const listItem: MovieListItem = {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    };

    if (saved) {
      removeFromWatchlist(movie.id);
      setSaved(false);
    } else {
      addToWatchlist(listItem);
      setSaved(true);
    }
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !movie) {
    return (
      <div className="space-y-4">
        <BackLink />
        <ErrorMessage message={error ?? "Movie not found."} />
      </div>
    );
  }

  const genreNames = movie.genres.map((g) => g.name).join(", ");
  const runtimeText =
    movie.runtime && movie.runtime > 0 ? `${movie.runtime} min` : "—";

  return (
    <div className="space-y-6">
      <BackLink />

      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={`${movie.title} poster`}
          className="mx-auto w-full max-w-[280px] rounded-xl border border-zinc-800 shadow-xl"
        />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white md:text-4xl">{movie.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
            <span className="flex items-center gap-1 text-amber-400">
              <Star className="h-4 w-4 fill-amber-400" aria-hidden />
              {formatRating(movie.vote_average)} / 10
            </span>
            <span>{getReleaseYear(movie.release_date)}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden />
              {runtimeText}
            </span>
          </div>

          {genreNames && (
            <p className="text-sm text-amber-400/90">{genreNames}</p>
          )}

          <p className="leading-relaxed text-zinc-300">
            {movie.overview || "No overview available for this movie."}
          </p>

          <button
            type="button"
            onClick={handleWatchlistClick}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 font-medium transition ${
              saved
                ? "bg-zinc-700 text-white hover:bg-zinc-600"
                : "bg-amber-500 text-zinc-950 hover:bg-amber-400"
            }`}
          >
            <Heart
              className={`h-5 w-5 ${saved ? "fill-red-400 text-red-400" : ""}`}
              aria-hidden
            />
            {saved ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        </div>
      </div>
    </div>
  );
}

function BackLink() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-amber-400"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden />
      Back to Discover
    </Link>
  );
}

export default MovieDetailsPage;
