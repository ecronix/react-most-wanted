import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { externalizeDeps } from "vite-plugin-externalize-deps";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer(),
    externalizeDeps({
      devDeps: true,
    }),
  ],
  resolve: {
    alias: {
      "@ecronix/rmw-shell": path.resolve(__dirname, "src"),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "rmw-shell",
      formats: ["es"],
    },
  },
});
