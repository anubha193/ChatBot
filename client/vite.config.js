import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/ChatBot/',           // 👈 IMPORTANT: top-level, matches repo name
  plugins: [react()],

})
