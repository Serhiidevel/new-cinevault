import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { MovieListItem } from "../../types/movie";
import { formatRating, getPosterUrl, getReleaseYear } from "../../utils/api";

type MovieCardProps = {
  movie: MovieListItem;
};

/**
 * One movie tile in a grid — poster, title, year, rating.
 * Clicking goes to the details page.
 */
function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10">
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="aspect-[2/3] overflow-hidden bg-zinc-800">
          <img
            src={getPosterUrl(movie.poster_path)}
            alt={`${movie.title} poster`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="space-y-1 p-3">
          <h3 className="line-clamp-2 font-semibold text-white group-hover:text-amber-400">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-sm text-zinc-400">
            <span>{getReleaseYear(movie.release_date)}</span>
            <span className="flex items-center gap-1 text-amber-400">
              <Star className="h-3.5 w-3.5 fill-amber-400" aria-hidden />
              {formatRating(movie.vote_average)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default MovieCard;
