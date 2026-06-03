# Movie Discovery App (New CineVault)

[![Deployed with Vercel](https://vercel.com)](https://vercel.app)

A dynamic movie discovery application where users can browse TMDB trends, search for films, and manage a personalized watchlist via `localStorage`.

*   **Live Demo:** [https://vercel.app](https://new-cinevault.vercel.app/)
*   **Built With:** React, TypeScript, Vite, Tailwind CSS, TMDB API


# CineVault

> Discover movies, explore details, and build your personal watchlist — a clean React portfolio project built for clarity, not complexity.

**CineVault** is a movie discovery web app that lets you browse trending films from [The Movie Database (TMDB)](https://www.themoviedb.org/), search by title, view full details, and save favorites to a watchlist that persists in your browser. The codebase is intentionally simple: readable components, helpful comments, and only the React patterns a junior developer is expected to know.

---

## About the project

This project was built as a **junior frontend portfolio piece**. The goal is to show that you can:

- Structure a small React app with clear folders and routes
- Fetch data from a real REST API and handle loading and error states
- Manage UI state with `useState` and side effects with `useEffect`
- Persist user data with `localStorage` (no global state libraries)
- Style a responsive interface with Tailwind CSS

There is no Redux, no TanStack Query, and no custom hook maze — so reviewers (and future you) can follow the code from top to bottom without getting lost.

---

## Features

| Feature | Description |
|--------|-------------|
| **Discover** | Browse popular movies on the home page |
| **Search** | Find films by title with debounced API requests |
| **Movie details** | Poster, rating, year, runtime, genres, and overview |
| **Watchlist** | Add or remove movies; data saved in `localStorage` |
| **Responsive UI** | Works on mobile and desktop |
| **Accessible basics** | Semantic HTML, labels, and ARIA where it matters |

---

## Tech stack

| Category | Tools |
|----------|--------|
| **Framework** | React 19 + TypeScript |
| **Build tool** | Vite |
| **Styling** | Tailwind CSS v4 |
| **Routing** | React Router DOM |
| **Icons** | Lucide React |
| **Data** | TMDB REST API |
| **Persistence** | Browser `localStorage` |

**React hooks used:** `useState`, `useEffect`, `useMemo` only.

---

## Screenshots

_Add screenshots or a GIF here after you deploy or run the app locally._

| Home | Details | Watchlist |
|------|---------|-----------|
| _Popular movies grid_ | _Single movie page_ | _Saved favorites_ |

---

## Live demo (GitHub Pages)

After deployment, your site URL is:

```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

Example: if the repo is `new-cinevault` → `https://serhi.github.io/new-cinevault/`

### Deploy to GitHub Pages

1. Push this code to GitHub (branch `main`).
2. **Settings → Secrets and variables → Actions** → New secret:
   - Name: `VITE_TMDB_API_KEY`
   - Value: your TMDB API key (same as in local `.env`)
3. **Settings → Pages → Build and deployment → Source** → choose **GitHub Actions**.
4. Push to `main` (or run the **Deploy to GitHub Pages** workflow manually).  
   The workflow in `.github/workflows/deploy.yml` builds with the correct base path and deploys `dist/`.

**Why it broke before:** Vite defaults to `/` for assets, but GitHub Pages serves from `/repo-name/`. Without `base` + `basename`, you get a blank page. Also `.env` is not on GitHub — the API key must be a repository secret.

---


## Project structure

```
src/
├── components/
│   ├── layout/          # Header, shared page shell (Layout)
│   ├── movies/          # MovieCard, MovieGrid, SearchBar
│   └── ui/              # LoadingSpinner, EmptyState, ErrorMessage
├── pages/
│   ├── HomePage.tsx           # Popular movies + search
│   ├── MovieDetailsPage.tsx   # Single movie + watchlist toggle
│   └── WatchlistPage.tsx      # Saved movies from localStorage
├── types/
│   └── movie.ts         # TypeScript types for API data
├── utils/
│   ├── api.ts           # TMDB fetch helpers
│   └── storage.ts       # Watchlist read/write helpers
├── App.tsx              # Route definitions
├── main.tsx             # App entry + BrowserRouter
└── index.css            # Tailwind imports + global styles
```

**Routing overview**

| Path | Page |
|------|------|
| `/` | Discover & search |
| `/movie/:movieId` | Movie details |
| `/watchlist` | Personal watchlist |

---


1. **Home** loads popular movies on mount via `useEffect` and `fetch`.
2. **Search** waits 400ms after the user stops typing, then calls the TMDB search endpoint.
3. **Details** reads `movieId` from the URL with `useParams`, fetches one movie, and toggles the watchlist.
4. **Watchlist** reads saved movies from `localStorage` when the page opens.

---

## What you can highlight in interviews

- **Client-side routing** with nested routes and a shared layout
- **Async data** with loading, error, and empty states
- **Debounced search** to reduce unnecessary API calls
- **Type safety** with TypeScript interfaces for API responses
- **Separation of concerns** — UI in components, API in `utils/api.ts`, persistence in `utils/storage.ts`
- **Cleanup in `useEffect`** to avoid state updates after unmount

---

## Possible improvements

Ideas for a follow-up version (good to mention in a portfolio README):

- Pagination or “load more” for search results
- Genre filter on the home page
- Share watchlist export/import as JSON
- Backend proxy to keep the TMDB key off the client
- Unit tests for `storage.ts` and API helpers
