import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom'],
    alias: {
      nothing: '/src/fallbacks/missingModule.ts',
      '@/api': path.resolve(rootDir, './src/server/api'),
      '@server': path.resolve(rootDir, './src/server'),
      '@': path.resolve(rootDir, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
