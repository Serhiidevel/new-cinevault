import type { MovieListItem } from "../../types/movie";
import MovieCard from "./MovieCard";

type MovieGridProps = {
  movies: MovieListItem[];
};

/** Responsive grid of MovieCard components */
function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;
