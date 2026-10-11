import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true, // Cho phép tất cả các host, giúp khắc phục lỗi Blocked request trên Render
  }
})