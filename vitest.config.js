import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Kept separate from vite.config.js so the test run does not pull in the
// gallery image pipeline (sharp) or the GitHub Pages output plugin.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // The real module is produced by the gallery-manifest plugin at build
      // time; tests use a fixture with the same shape.
      'virtual:gallery': new URL('./src/test/galleryFixture.js', import.meta.url).pathname,
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.js'],
    include: ['src/**/*.test.{js,jsx}', 'tools/**/*.test.js'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,jsx}', 'tools/**/*.js'],
      exclude: [
      'src/main.jsx',
      'src/data.js',
      'src/test/**',
      'src/**/*.test.{js,jsx}',
    ],
    },
  },
})
