import { defineConfig } from 'vite';
import path from 'path';
import sass from 'sass';
import htmlInject from 'vite-plugin-html-inject';
import fullReload from 'vite-plugin-full-reload';
import sortCss from 'postcss-sort-media-queries';

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';

export default defineConfig({
  mode,
  base: './',
  root: path.resolve(__dirname, 'src'),
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: devMode,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.js'),
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(assetInfo.name)) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name][extname]';
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 4173,
    open: true,
  },
  css: {
    postcss: {
      plugins:[
        sortCss({sort:'mobile-first'})
      ]
    },
    preprocessorOptions: {
      scss: {
        implementation: sass,
        additionalData: `@use "bootstrap/scss/bootstrap" as *;`,
        includePaths: ['./src/scss/styles'],
            },
    },
  },
  plugins: [
    htmlInject(),
    fullReload(['./src/**/*.html']),
    sortCss({ sort: 'mobile-first' }),
  ],
});


        // additionalData: `@import "@/scss/loader.scss";`,
        // includePaths: [path.resolve(__dirname, './src/scss/styles')],