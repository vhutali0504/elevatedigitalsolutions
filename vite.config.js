import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The app lives in client/. Shared config and .env stay at the repo root.
export default defineConfig({
  root: 'client',
  envDir: '..',
  plugins: [react()],
  build: { outDir: '../dist', emptyOutDir: true },
})
