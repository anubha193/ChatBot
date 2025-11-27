import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      "/api":"https://chatbot-6tun.onrender.com/",
      base: '/ChatBot/'
    }
  },
  plugins: [react()],
})
