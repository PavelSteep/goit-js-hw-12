import { defineConfig } from 'vite';
import { resolve } from 'path';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => ({
  define: {
    [command === 'serve' ? 'global' : '_global']: {},
  },
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: command === 'serve',
    rollupOptions: {
      input: resolve(__dirname, 'src/index.html'),
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    port: 4500,
    open: true,
    hmr: true,
  },
  plugins: [
    injectHTML(),
    FullReload(['./src/**/*.html']),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/scss/loader.scss";`,
      },
    },
  },
}));








// import { defineConfig } from 'vite';
// import { resolve } from 'path';
// import { glob } from 'glob';
// import injectHTML from 'vite-plugin-html-inject';
// import FullReload from 'vite-plugin-full-reload';
// import SortCss from 'postcss-sort-media-queries';
// import path from 'path';

// export default defineConfig(({ command }) => {
//   return {
//     define: {
//       [command === 'serve' ? 'global' : '_global']: {},
//     },
//     root: resolve(__dirname, 'src'),
//     root: 'src',
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
//       outDir: '../dist',  // Папка для выходных файлов
//       emptyOutDir: true,  // Очищать выходную папку при каждом сборе
//     },
//     plugins: [
//       injectHTML(), // Плагин для инъекций в HTML
//       FullReload(['./src/**/**.html']), // Для автоматической перезагрузки при изменениях в HTML
//       SortCss({
//         sort: 'mobile-first', // Сортировка медиа-запросов в CSS
//       }),
//     ],
//     server: {
//       port: 5173,
//     },
//     css: {
//       preprocessorOptions: {
//         scss: {
//           additionalData: `
//             @import "./src/scss/loader.scss"; // Глобальное подключение стилей
//             @import "./src/scss/style.scss";
//           `,
//           includePaths: ['./src/scss/styles'], // Чтобы не использовать относительные пути при импорте
//         },
//       },
//     },
//   };
// });




// import { defineConfig } from 'vite';
// import { glob } from 'glob';
// import injectHTML from 'vite-plugin-html-inject';
// import FullReload from 'vite-plugin-full-reload';
// import SortCss from 'postcss-sort-media-queries';

// export default defineConfig(({ command }) => {
//   return {
//     define: {
//       [command === 'serve' ? 'global' : '_global']: {},
//     },
//     root: 'src',
//     build: {
//       sourcemap: true, // Если не нужно генерировать карты исходников для SCSS, можно отключить
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
//       outDir: '../dist', // Папка для выходных файлов
//       emptyOutDir: true, // Очищать выходную папку при каждом сборе
//     },
//     plugins: [
//       injectHTML(), // Плагин для инъекций в HTML
//       FullReload(['./src/**/**.html']), // Для автоматической перезагрузки при изменениях в HTML
//       SortCss({
//         sort: 'mobile-first', // Сортировка медиа-запросов в CSS
//       }),
//     ],
//     css: {
//       preprocessorOptions: {
//         scss: {
//           // Настройка SCSS, чтобы использовать правильные пути и предустановленные переменные
//           additionalData: `@import "./scss/variables.scss";`, // Пример импорта глобальных переменных или стилей
//         },
//       },
//     },
//   };
// });










// import { defineConfig } from 'vite';
// import { glob } from 'glob';
// import injectHTML from 'vite-plugin-html-inject';
// import FullReload from 'vite-plugin-full-reload';
// import SortCss from 'postcss-sort-media-queries';

// export default defineConfig(({ command }) => {
//   return {
//     define: {
//       [command === 'serve' ? 'global' : '_global']: {},
//     },
//     root: 'src',
//     build: {
//       sourcemap: true,
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
//       outDir: '../dist',  // Папка для выходных файлов
//       emptyOutDir: true,  // Очищать выходную папку при каждом сборе
//     },
//     plugins: [
//       injectHTML(), // Плагин для инъекций в HTML
//       FullReload(['./src/**/**.html']), // Для автоматической перезагрузки при изменениях в HTML
//       SortCss({
//         sort: 'mobile-first', // Сортировка медиа-запросов в CSS
//       }),
//     ],
//   };
// });
