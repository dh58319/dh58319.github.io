import { join } from 'node:path'
import { describe, expect, test } from 'vitest'
import { listGallery, VARIANT_WIDTHS } from './gallery.js'

const GALLERY = join(process.cwd(), 'src/assets/gallery')

describe('listGallery', () => {
  const photos = listGallery(GALLERY)

  test('finds the repository gallery images', () => {
    expect(photos.length).toBeGreaterThan(0)
  })

  test('returns entries sorted by filename so ordering is stable across builds', () => {
    const names = photos.map((p) => p.name)
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)))
  })

  test('attaches intrinsic dimensions to every entry', () => {
    for (const photo of photos) {
      expect(photo.width, photo.name).toBeGreaterThan(0)
      expect(photo.height, photo.name).toBeGreaterThan(0)
    }
  })

  test('ignores non-image files such as .gitkeep', () => {
    expect(photos.some((p) => p.name.startsWith('.'))).toBe(false)
  })

  test('declares rendition widths that cover 1x and 2x of the grid columns', () => {
    expect(VARIANT_WIDTHS).toEqual([...VARIANT_WIDTHS].sort((a, b) => a - b))
    expect(Math.min(...VARIANT_WIDTHS)).toBeLessThanOrEqual(400)
  })
})
