import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { externalizeDeps } from "vite-plugin-externalize-deps";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer(), externalizeDeps()],
  resolve: {
    alias: {
      "@ecronix/base-shell": path.resolve(__dirname, "src"),
    },
  },
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "base-shell",
      formats: ["es"],
    },
  },
});
