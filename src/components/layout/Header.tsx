import { Film, Heart } from "lucide-react";
import { NavLink } from "react-router-dom";

/**
 * Top navigation bar — shown on every page via Layout.
 * NavLink automatically adds an "active" class on the current route.
 */
function Header() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-amber-500/20 text-amber-400"
        : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
    }`;

  return (
    <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-bold text-white">
          <Film className="h-6 w-6 text-amber-400" aria-hidden />
          CineVault
        </NavLink>

        <nav className="flex items-center gap-1" aria-label="Main navigation">
          <NavLink to="/" end className={linkClass}>
            <Film className="h-4 w-4" aria-hidden />
            Discover
          </NavLink>
          <NavLink to="/watchlist" className={linkClass}>
            <Heart className="h-4 w-4" aria-hidden />
            Watchlist
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
