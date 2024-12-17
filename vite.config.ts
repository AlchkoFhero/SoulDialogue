import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Исправленный импорт плагина
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: '_redirects', // Исходный файл
          dest: '' // Поместить файл в корень папки dist
        }
      ]
    })
  ],
  server: {
    port: 3000,
    host: true
  }
});
