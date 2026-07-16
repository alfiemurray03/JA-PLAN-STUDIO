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
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/') || id.includes('/node_modules/scheduler/')) return 'react-vendor';
          if (id.includes('/node_modules/react-router')) return 'router-vendor';
          if (id.includes('/node_modules/@radix-ui/')) return 'radix-vendor';
          if (id.includes('/node_modules/lucide-react/')) return 'icons-vendor';
          if (id.includes('/node_modules/motion/')) return 'motion-vendor';
          if (id.includes('/node_modules/@lexical/') || id.includes('/node_modules/lexical/')) return 'editor-vendor';
          if (id.includes('/node_modules/')) return 'vendor';
          if (id.includes('/src/lib/builders/') || id.includes('/src/lib/templates/')) return 'document-templates';
        },
      },
    },
  },
});
