import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import sharp from 'sharp'
import { readImageSize } from './imageSize.js'

const IMAGE_RE = /\.(jpe?g|png|webp)$/i

// Rendered widths: the grid shows four ~270px columns at 1440, and the
// lightbox goes up to 92vw. These cover 1x and 2x for both cases. The source's
// own width is added as the top rendition so the lightbox never has to fall
// back to the much larger original JPEG on a wide screen.
export const VARIANT_WIDTHS = [400, 800, 1600]

// Derived files live outside the repo. They are keyed by source content, so a
// rebuild is free and replacing a photo invalidates only that photo.
const CACHE_DIR = resolve(process.cwd(), 'node_modules/.cache/gallery')

function cacheKey(file) {
  const { size, mtimeMs } = statSync(file)
  return createHash('sha1').update(`${file}:${size}:${mtimeMs}`).digest('hex').slice(0, 12)
}

// Produces WebP renditions of one source image, skipping any width that would
// upscale it. Returns the widths actually written, ascending.
async function buildVariants(file, intrinsicWidth) {
  mkdirSync(CACHE_DIR, { recursive: true })
  const key = cacheKey(file)
  const widths = VARIANT_WIDTHS.filter((w) => !intrinsicWidth || w < intrinsicWidth)
  if (intrinsicWidth && !widths.includes(intrinsicWidth)) widths.push(intrinsicWidth)
  const out = []

  for (const width of widths) {
    const target = join(CACHE_DIR, `${key}-${width}.webp`)
    if (!existsSync(target)) {
      await sharp(file)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(target)
    }
    out.push({ width, file: target })
  }
  return out
}

export function listGallery(dir) {
  return readdirSync(dir)
    .filter((name) => IMAGE_RE.test(name))
    .sort((a, b) => a.localeCompare(b))
    .map((name) => {
      const file = join(dir, name)
      const size = readImageSize(readFileSync(file))
      return { name, file, width: size?.width ?? null, height: size?.height ?? null }
    })
}

export async function buildManifest(dir) {
  const photos = listGallery(dir)
  return Promise.all(
    photos.map(async (p) => ({ ...p, variants: await buildVariants(p.file, p.width) })),
  )
}
