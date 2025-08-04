<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 56ad73000173295625d7b0cec8a1e0f3134c4ba8
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: './',
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
<<<<<<< HEAD
=======
=======

>>>>>>> 56ad73000173295625d7b0cec8a1e0f3134c4ba8
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: './',
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
<<<<<<< HEAD
>>>>>>> c9964a02f7b09d9920a8a956c4a5e2617513e473
=======

>>>>>>> 56ad73000173295625d7b0cec8a1e0f3134c4ba8
