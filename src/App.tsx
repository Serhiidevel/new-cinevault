import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import WatchlistPage from "./pages/WatchlistPage";

/**
 * App.tsx — only responsible for routing.
 * Each page lives in src/pages/ so the structure stays easy to navigate.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="movie/:movieId" element={<MovieDetailsPage />} />
        <Route path="watchlist" element={<WatchlistPage />} />
      </Route>
    </Routes>
  );
}

export default App;
