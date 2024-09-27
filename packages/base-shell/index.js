import { fileURLToPath } from "url";
import path from "path";
import { globSync } from "glob";

console.log(
  Object.fromEntries(
    globSync([
      "src/components/**/*.jsx",
      "src/containers/**/*.jsx",
      "src/pages/**/*.jsx",
    ])
      .filter((file) => file.endsWith("index.jsx") || file.endsWith("index.js"))
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
);
