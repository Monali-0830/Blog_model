// vite.config.js
import { defineConfig } from 'vite'
import react      from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // any request starting with /api will be forwarded to localhost:555
      '/api': {
        target:   'http://localhost:555',
        changeOrigin: true,
        secure:       false,
      },
    },
  },
})
