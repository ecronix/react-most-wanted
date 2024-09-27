import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import { globSync } from "glob";
import { fileURLToPath } from "url";

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
      input: {
        "base-shell": resolve(__dirname, "src", "index.js"),
        providers: resolve(__dirname, "src", "providers/index.js"),
        utils: resolve(__dirname, "src", "utils/index.js"),
        components: resolve(__dirname, "src", "components/index.js"),
        ...Object.fromEntries(
          globSync([
            "src/components/**/*.jsx",
            "src/containers/**/*.jsx",
            "src/pages/**/*.jsx",
          ])
            .filter(
              (file) => file.endsWith("index.jsx") || file.endsWith("index.js"),
            )
            .map((file) => [
              // This remove `src/` as well as the file extension from each
              // file, so e.g. src/nested/foo.js becomes nested/foo
              // if it ends in index.jsx, remove that part too
              path.relative("src", file).replace(/\/index\.jsx|\.jsx$/, ""),
              // This expands the relative paths to absolute paths, so e.g.
              // src/nested/foo becomes /project/src/nested/foo.js
              fileURLToPath(new URL(file, import.meta.url)),
            ]),
        ),
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
