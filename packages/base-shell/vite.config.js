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
      entry: [], // No need to fill it, as `rollupOptions.input` is used and overrides this.
      formats: ["es"],
    },
    rollupOptions: {
      input: {
        "base-shell": resolve(__dirname, "src", "index.js"),
        // The following exports all the filed in the `src/components`, `src/containers`, and `src/pages`
        // folders so they can also be imported also using the syntax `from @ecronix/base-shll/containers/SomeComponent`.
        // This is needed as react does not support lazy loading components that are not exported as `default`.
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
          /** NOTE
          The following exports were used to export all the hooks from the `/providers` folder. It was removed
          in favor of exporting the hooks directly from the main `index.js` file, so hooks can be
          imported directly from `@ecronix/base-shell`.

          This approach avoids issues in React where a different Context instance is created when importing
          the hooks from different paths. `"@ecronix/base-shell" !== "@ecronix/base-shell/providers"`.
          */
          // providers: resolve(__dirname, "src/providers/index.js"),
          // utils: resolve(__dirname, "src/utils/index.js"),
          // componets: resolve(__dirname, "src/components/index.js"),
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
