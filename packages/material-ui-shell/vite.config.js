import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'

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
        'material-ui-shell': resolve(__dirname, 'src', 'index.js'),
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
