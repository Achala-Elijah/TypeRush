import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
	  import { fileURLToPath } from 'url'

	  const cfilename = fileURLToPath(import.meta.url)
	  const cdirname = path.dirname(cfilename)

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // change this to any port you like
  },
  resolve: {
    alias: {
      '@': path.resolve(cdirname, './src'),
      },
  },
})
