import { defineConfig } from 'vite';
import path from 'path';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

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
  plugins: [
    injectHTML(),
    FullReload(['./src/**/*.html']),
    SortCss({ sort: 'mobile-first' }),
  ],
});






// import { defineConfig } from 'vite';
// import { resolve } from 'path';
// import { glob } from 'glob';
// import injectHTML from 'vite-plugin-html-inject';
// import FullReload from 'vite-plugin-full-reload';
// import SortCss from 'postcss-sort-media-queries';

// export default defineConfig(({ command }) => {
//   return {
//     define: {
//       [command === 'serve' ? 'global' : '_global']: {},
//     },
//     root: resolve(__dirname, 'src'),
//     build: {
//       sourcemap: true,
//       outDir: '../dist',
//       rollupOptions: {
//         input: glob.sync('./src/*.html'),
//         output: {
//           manualChunks(id) {
//             if (id.includes('node_modules')) {
//               return 'vendor';
//             }
//           },
//           entryFileNames: chunkInfo => {
//             if (chunkInfo.name === 'commonHelpers') {
//               return 'commonHelpers.js';
//             }
//             return '[name].js';
//           },
//           assetFileNames: assetInfo => {
//             if (assetInfo.name && assetInfo.name.endsWith('.html')) {
//               return '[name].[ext]';
//             }
//             return 'assets/[name]-[hash][extname]';
//           },
//         },
//       },
//       outDir: '../dist',
//       emptyOutDir: true,
//     },
//     plugins: [
//       injectHTML(),
//       FullReload(['./src/**/**.html']),
//       SortCss({
//         sort: 'mobile-first',
//       }),
//     ],
//     server: {
//       port: 5173,
//     },
//     css: {
//       preprocessorOptions: {
//         scss: {
//           additionalData: `@import "./src/scss/loader.scss";`,
//           includePaths: ['./src/scss/styles'],
//         },
//       },
//     },
//   };
// });
