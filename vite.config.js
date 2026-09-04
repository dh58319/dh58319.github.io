import { copyFileSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { buildManifest } from './tools/gallery.js'
import { parseFrontmatter } from './src/lib/frontmatter.js'

// GitHub Pages base path.
// - User/Org page repo named "<username>.github.io"  -> base: '/'
// - Project page repo (e.g. "portfolio")             -> base: '/portfolio/'
// Override at build time with: BASE_PATH=/your-repo/ npm run build
const base = process.env.BASE_PATH ?? '/'

const GALLERY_DIR = resolve(__dirname, 'src/assets/gallery')

// Exposes `virtual:gallery` — every image in src/assets/gallery/ with its
// intrinsic dimensions and a set of downscaled WebP renditions attached. The
// dimensions let each tile reserve its box (no layout shift) and the renditions
// keep the grid from downloading 2000px originals for 270px thumbnails.
// Dropping a file into that folder is still all that is required to add a photo.
function galleryManifest() {
  const VIRTUAL_ID = 'virtual:gallery'
  const RESOLVED_ID = '\0' + VIRTUAL_ID

  return {
    name: 'gallery-manifest',
    resolveId: (id) => (id === VIRTUAL_ID ? RESOLVED_ID : null),
    async load(id) {
      if (id !== RESOLVED_ID) return null
      const photos = await buildManifest(GALLERY_DIR)

      const imports = []
      const entries = []
      photos.forEach((p, i) => {
        imports.push(`import src${i} from ${JSON.stringify(p.file)}`)
        const variants = p.variants.map((v, j) => {
          imports.push(`import v${i}_${j} from ${JSON.stringify(v.file)}`)
          return `{ src: v${i}_${j}, width: ${v.width} }`
        })
        entries.push(
          `{ src: src${i}, name: ${JSON.stringify(p.name.replace(/\.[^.]+$/, ''))}, ` +
            `width: ${p.width ?? 'null'}, height: ${p.height ?? 'null'}, ` +
            `variants: [${variants.join(', ')}] }`,
        )
      })
      return `${imports.join('\n')}\n\nexport default [\n  ${entries.join(',\n  ')}\n]\n`
    },
    // Adding or removing a photo should refresh the manifest during dev.
    configureServer(server) {
      server.watcher.add(GALLERY_DIR)
      const invalidate = (file) => {
        if (!file.startsWith(GALLERY_DIR)) return
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', invalidate)
      server.watcher.on('unlink', invalidate)
    },
  }
}

const SITE_ORIGIN = 'https://dh58319.github.io'
const POSTS_DIR = resolve(__dirname, 'src/content/posts')

// Blog slugs come from the filename unless the frontmatter overrides them,
// which mirrors how src/blog.js resolves them at runtime.
function postSlugs() {
  return readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = readFileSync(join(POSTS_DIR, f), 'utf8')
      const { data } = parseFrontmatter(raw)
      // Posts that link out live on someone else's site; do not claim them.
      if (data.url) return null
      return data.slug || f.replace(/\.md$/, '')
    })
    .filter(Boolean)
}

// GitHub Pages serves 404.html for any path it does not have a file for.
// Shipping a copy of index.html there lets the client router handle deep links
// like /research directly, so URLs stay clean and each page is its own document
// for crawlers and shared links. A sitemap is only meaningful now that routes
// are real paths rather than hash fragments.
function githubPages() {
  return {
    name: 'github-pages-output',
    closeBundle() {
      const dir = resolve(__dirname, 'dist')
      copyFileSync(resolve(dir, 'index.html'), resolve(dir, '404.html'))

      const paths = ['/', '/research', '/photography', '/blog', ...postSlugs().map((s) => `/blog/${s}`)]
      const urls = paths
        .map((path) => `  <url><loc>${SITE_ORIGIN}${path}</loc></url>`)
        .join('\n')
      writeFileSync(
        resolve(dir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      )
    },
  }
}

export default defineConfig({
  base,
  // Treat uppercase image extensions as static assets (Vite's defaults are lowercase only).
  assetsInclude: ['**/*.JPG', '**/*.JPEG', '**/*.PNG', '**/*.WEBP'],
  plugins: [react(), galleryManifest(), githubPages()],
  build: {
    rollupOptions: {
      output: {
        // Keep framework code in a stable vendor chunk for long-term caching.
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
