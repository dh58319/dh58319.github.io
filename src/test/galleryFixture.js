// Stands in for the `virtual:gallery` module that vite.config.js generates, so
// the Photography page can be tested without running the image pipeline.
export default [
  { src: '/one.jpg', name: 'one', width: 2000, height: 1333, variants: [
    { src: '/one-400.webp', width: 400 },
    { src: '/one-800.webp', width: 800 },
  ] },
  { src: '/two.jpg', name: 'two', width: 1333, height: 2000, variants: [
    { src: '/two-400.webp', width: 400 },
  ] },
  { src: '/three.jpg', name: 'three', width: 2000, height: 2000, variants: [] },
]
