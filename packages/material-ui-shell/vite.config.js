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
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: '@ecronix/material-ui-shell',
      fileName: (format) => `material-ui-shell.${format}.js`,
    },
    rollupOptions: {
      external: [
        'intl',
        'react',
        'react-dom',
        'react-intl',
        'react-router-dom',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-intl': 'ReactIntl',
          'react-router-dom': 'ReactRouterDom',
          intl: 'Intl',
        },
      },
    },
  },
})
