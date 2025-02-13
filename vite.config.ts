import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

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
    },
    headers: {
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-eval' 'unsafe-inline' blob:;
        worker-src 'self' blob: data:;
        style-src 'self' 'unsafe-inline';
        img-src 'self' data: blob:;
        connect-src 'self' ws: wss: blob:;
        child-src 'self' blob:;
      `.replace(/\s+/g, ' ').trim()
    }
  },
  resolve: {
    alias: {
      // Add alias for pdf.js worker
      'pdfjs-dist': resolve(__dirname, 'node_modules/pdfjs-dist'),
      '@': resolve(__dirname, 'src')
    }
  },
  optimizeDeps: {
    include: ['pdfjs-dist'],
    exclude: []
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          pdfjs: ['pdfjs-dist']
        }
      }
    },
    // Ensure worker files are copied to dist
    assetsDir: 'assets',
    copyPublicDir: true,
    // Ensure proper handling of worker files
    target: 'esnext',
    sourcemap: true
  }
});
