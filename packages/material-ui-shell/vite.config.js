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
      entry: [
        resolve(__dirname, 'src/index.js'),
        resolve(__dirname, 'src/containers/Page/Page.jsx'),
        resolve(__dirname, 'src/containers/Page/ListPage.jsx'),
        resolve(__dirname, 'src/components/MenuHeader/MenuHeader.jsx'),
        resolve(__dirname, 'src/containers/Menu/Menu.jsx'),
        resolve(__dirname, 'src/components/Loading/Loading.jsx'),
      ],
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'intl',
        'react',
        'react-dom',
        'react-intl',
        'react-router-dom',
        '@ecronix/base-shell',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-intl': 'ReactIntl',
          'react-router-dom': 'ReactRouterDom',
          intl: 'Intl',
          '@ecronix/base-shell': 'BaseShell',
        },
      },
    },
  },
})
