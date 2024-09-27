import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import { globSync } from "glob";

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
      entry: [],
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
      input: {
        providers: resolve(__dirname, "src", "providers/index.js"),
        utils: resolve(__dirname, "src", "utils/index.js"),
        "containers/App": resolve(__dirname, "src", "containers/App.jsx"),
        "containers/Layout": resolve(__dirname, "src", "containers/Layout.jsx"),
        components: resolve(__dirname, "src", "components/index.js"),
      },
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
