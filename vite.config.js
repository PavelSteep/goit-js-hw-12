import { defineConfig } from 'vite';
import path from 'path';
import { resolve } from 'path';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  base: './',  // укажите базовый путь, если ваш проект будет размещен в подкаталоге
  root: 'src',  // Указываем корневую директорию проекта
  build: {
    outDir: '../dist',  // Папка для выходных файлов
    emptyOutDir: true,  // Очищать выходную папку при каждом сборе
    sourcemap: true,  // Включаем sourcemaps для отладки
    rollupOptions: {
      input: resolve(__dirname, 'src/main.js'),  // Указываем main.js как точку входа
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(assetInfo.name)) {
            return 'assets/[name]-[hash][extname]'; // Здесь задаем путь для картинок
          }
          return 'assets/[name][extname]'; // Для других файлов
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';  // Часть кода, которая будет вынесена в отдельный файл
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Упрощает импорты
      '@api': resolve(__dirname, './src/js'),
    },
  },
  server: {
    port: 4173,  // Порт для сервера
    open: true,  // Автоматически открывать браузер
    hmr: true,   // Поддержка горячей перезагрузки
  },
  plugins: [
    injectHTML(),  // Плагин для инъекций в HTML
    FullReload(['./src/**/*.html']),  // Для автоматической перезагрузки при изменениях в HTML
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/scss/loader.scss";`,  // Подключение глобальных стилей
      },
    },
  },
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.webp', '**/*.svg'], // Обработка изображений
});
