import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'
import { globSync } from 'glob'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ecronix/material-ui-shell': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    minify: false,
    lib: {
      entry: [],
      formats: ['es'],
    },
    rollupOptions: {
      input: {
        providers: resolve(__dirname, 'src', 'providers/index.js'),
        components: resolve(__dirname, 'src', 'components/index.js'),
        utils: resolve(__dirname, 'src', 'utils/index.js'),
        ...Object.fromEntries(
          globSync([
            'src/components/**/*.jsx',
            'src/containers/**/*.jsx',
            'src/pages/**/*.jsx',
          ])
            .filter((file) => file.endsWith('index.jsx'))
            .map((file) => [
              // This remove `src/` as well as the file extension from each
              // file, so e.g. src/nested/foo.js becomes nested/foo
              // if it ends in index.jsx, remove that part too
              path.relative('src', file).replace(/\/index\.jsx|\.jsx$/, ''),
              // This expands the relative paths to absolute paths, so e.g.
              // src/nested/foo becomes /project/src/nested/foo.js
              fileURLToPath(new URL(file, import.meta.url)),
            ])
        ),
      },
      external: [
        'intl',
        'react',
        'react-dom',
        'react-intl',
        'react-router-dom',
        '@ecronix/base-shell',
        '@emotion/react',
        '@emotion/styled',
        '@fontsource/roboto',
        '@mui/icons-material',
        '@mui/material',
        'jss-rtl',
        'lp-react-virtualized-auto-sizer-react-18',
        'notistack',
        'react-custom-scrollbars-2',
        'react-dom',
        'react-easy-crop',
        'react-intl',
        'react-ios-pwa-prompt',
        'react-markdown',
        'react-window',
      ],
    },
  },
})
