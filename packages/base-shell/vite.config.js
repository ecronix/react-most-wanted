import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@ecronix/base-shell": path.resolve(__dirname, "src"),
    },
  },
  build: {
    minify: false,
    lib: {
      entry: [], // No need to fill it, as `rollupOptions.input` is used and overrides this.
      formats: ["es"],
    },
    rollupOptions: {
      input: {
        "base-shell": resolve(__dirname, "src", "index.js"),
      },
      external: [
        "intl",
        "react",
        "react-dom",
        "react-intl",
        "react-router-dom",
      ],
    },
  },
});
