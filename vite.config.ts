import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuration for Vite build and development
export default defineConfig({
  // Support for GitHub Pages deployment
  base: process.env.BASE_URL || '/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    open: true,
    fs: {
      allow: ['..']
    }
  },
  optimizeDeps: {
    exclude: ['pdfjs-dist']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          pdfjs: ['pdfjs-dist']
        }
      }
    }
  }
});
