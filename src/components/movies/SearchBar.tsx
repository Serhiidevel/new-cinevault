import { Search, X } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

/**
 * Controlled search input — parent owns the state (HomePage).
 * "Controlled" means React state is the single source of truth for the value.
 */
function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500"
        aria-hidden
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search movies by title..."
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-10 pr-10 text-white placeholder:text-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
        aria-label="Search movies"
      />
      {value.length > 0 && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
