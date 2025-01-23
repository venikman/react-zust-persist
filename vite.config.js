
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: 'src/client',
  publicDir: '../../public',
  server: {
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:5173',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: '../../dist',
    emptyOutDir: true
  }
})
