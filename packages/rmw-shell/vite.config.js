import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import { fileURLToPath } from "url";
import { globSync } from "glob";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@ecronix/rmw-shell": path.resolve(__dirname, "src"),
    },
  },
  publicDir: "cra-template-rmw/template/public",
  build: {
    lib: {
      entry: [],
      formats: ["es"],
    },
    rollupOptions: {
      input: {
        "rmw-shell": resolve(__dirname, "src/index.js"),
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
        "react",
        "react-dom",
        "@emotion/react",
        "@emotion/styled",
        "@fontsource/roboto",
        "@mui/icons-material",
        "@mui/material",
        "@mui/styles",
        "chart.js",
        "final-form",
        "final-form-arrays",
        "firebase",
        "firebaseui",
        "github-markdown-css",
        "intl",
        "jss-rtl",
        "lp-react-virtualized-auto-sizer-react-18",
        "moment",
        "mui-rff",
        "notistack",
        "react-beautiful-dnd",
        "react-chartjs-2",
        "react-countup",
        "react-custom-scrollbars-2",
        "react-easy-crop",
        "react-final-form",
        "react-final-form-arrays",
        "react-helmet",
        "react-intl",
        "react-ios-pwa-prompt",
        "react-linkify",
        "react-markdown",
        "react-router-dom",
        "react-window",
      ],
    },
  },
});
