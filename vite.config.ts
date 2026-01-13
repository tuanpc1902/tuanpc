import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~alias~': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Silence Dart Sass legacy JS API deprecation warning
        // This will be resolved when Vite updates to use modern Sass API
        silenceDeprecations: ['legacy-js-api'],
      },
      sass: {
        // Silence Dart Sass legacy JS API deprecation warning
        // This will be resolved when Vite updates to use modern Sass API
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'antd-vendor': ['antd'],
          'dayjs-vendor': ['dayjs'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
