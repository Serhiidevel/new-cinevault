import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * GitHub Pages hosts project sites at: https://username.github.io/REPO_NAME/
 * Assets must load from /REPO_NAME/ — not from the domain root.
 *
 * Local dev: leave VITE_BASE_PATH unset (defaults to "/").
 * GitHub Actions: sets VITE_BASE_PATH=/${{ repository.name }}/
 */
const base = process.env.VITE_BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
});
