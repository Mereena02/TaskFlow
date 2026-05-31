import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': { target: 'https://taskflow-production-90a4.up.railway.app', changeOrigin: true },
      '/actuator': { target: 'https://taskflow-production-90a4.up.railway.app', changeOrigin: true },
    },
  },
});
