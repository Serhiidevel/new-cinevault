import { Outlet } from "react-router-dom";
import Header from "./Header";

/**
 * Layout wraps all pages with shared UI (header + main content area).
 * <Outlet /> is where React Router renders the current page.
 */
function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-zinc-800 py-6 text-center text-sm text-zinc-500">
        Built with React · Data from{" "}
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer"
          className="text-amber-400 hover:underline"
        >
          TMDB
        </a>
      </footer>
    </div>
  );
}

export default Layout;
