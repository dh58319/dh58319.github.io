import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages base path.
// - User/Org page repo named "<username>.github.io"  -> base: '/'
// - Project page repo (e.g. "portfolio")             -> base: '/portfolio/'
// Override at build time with: BASE_PATH=/your-repo/ npm run build
const base = process.env.BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [react()],
})
