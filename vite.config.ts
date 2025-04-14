import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(async () => {
  const { viteStaticCopy } = await import('vite-plugin-static-copy');

  return {
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: '_redirects',
            dest: ''
          }
        ]
      }),
    ],
    build: {
      outDir: 'dist'
    }
  };
});
