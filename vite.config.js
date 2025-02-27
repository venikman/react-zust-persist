import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  root: 'src/client',
  publicDir: 'public',
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:3000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: '../../src/server/dist',
    emptyOutDir: true
  },
  preview: {
    host: '0.0.0.0',
    port: 4173
  }
}))