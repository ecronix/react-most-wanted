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
    lib: {
      entry: [
        resolve(__dirname, "src", "index.js"),
        resolve(__dirname, "src", "containers/App/App.jsx"),
        resolve(__dirname, "src", "containers/Layout/Layout.jsx"),
      ],
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "intl",
        "react",
        "react-dom",
        "react-intl",
        "react-router-dom",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-intl": "ReactIntl",
          "react-router-dom": "ReactRouterDom",
          intl: "Intl",
        },
      },
    },
  },
});
