import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/myFarm/",                  
  plugins: [react()],
  build: {assetsInlineLimit: 0},
})
