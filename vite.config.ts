import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Configuration for Vite build and development
export default defineConfig({
  // Support for GitHub Pages deployment
  base: process.env.BASE_URL || '/',
  plugins: [
    react(),
    {
      name: 'pdf-worker-plugin',
      // Copy PDF.js worker to public directory during dev and build
      buildStart: async () => {
        const fs = await import('fs/promises');
        
        try {
          await fs.mkdir('public/pdfjs', { recursive: true });
          // Use the correct path for the worker file
          const workerPath = resolve(
            __dirname,
            'node_modules/pdfjs-dist/build/pdf.worker.min.js'
          );
          await fs.copyFile(
            workerPath,
            'public/pdfjs/pdf.worker.min.js'
          );
        } catch (error) {
          console.error('Error copying PDF.js worker:', error);
        }
      }
    }
  ],
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
      '@': resolve(__dirname, 'src')
    }
  },
  optimizeDeps: {
    include: ['pdfjs-dist']
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
