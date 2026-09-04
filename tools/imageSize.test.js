import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, test } from 'vitest'
import { readImageSize } from './imageSize.js'

const GALLERY = join(process.cwd(), 'src/assets/gallery')

// Known-good fixtures built by hand so the parser is checked against bytes
// whose dimensions are certain, not just against whatever is in the repo.
function pngHeader(width, height) {
  const buf = Buffer.alloc(33)
  buf.writeUInt32BE(0x89504e47, 0)
  buf.writeUInt32BE(0x0d0a1a0a, 4)
  buf.writeUInt32BE(13, 8)
  buf.write('IHDR', 12, 'ascii')
  buf.writeUInt32BE(width, 16)
  buf.writeUInt32BE(height, 20)
  return buf
}

function jpegWithSof(width, height, { padSegments = 0 } = {}) {
  const parts = [Buffer.from([0xff, 0xd8])]
  for (let i = 0; i < padSegments; i++) {
    // An APP0-style segment the walker must skip using its length field.
    const seg = Buffer.alloc(20)
    seg.writeUInt16BE(0xffe0, 0)
    seg.writeUInt16BE(18, 2)
    parts.push(seg)
  }
  const sof = Buffer.alloc(11)
  sof.writeUInt16BE(0xffc0, 0)
  sof.writeUInt16BE(9, 2)
  sof.writeUInt8(8, 4)
  sof.writeUInt16BE(height, 5)
  sof.writeUInt16BE(width, 7)
  parts.push(sof, Buffer.alloc(8))
  return Buffer.concat(parts)
}

describe('readImageSize', () => {
  test('reads PNG dimensions from IHDR', () => {
    expect(readImageSize(pngHeader(1234, 567))).toEqual({ width: 1234, height: 567 })
  })

  test('reads JPEG dimensions from the SOF0 segment', () => {
    expect(readImageSize(jpegWithSof(1920, 1080))).toEqual({ width: 1920, height: 1080 })
  })

  test('walks past preceding segments to find the SOF', () => {
    expect(readImageSize(jpegWithSof(800, 600, { padSegments: 4 }))).toEqual({
      width: 800,
      height: 600,
    })
  })

  test('returns null for data that is not a recognised image', () => {
    expect(readImageSize(Buffer.from('not an image at all, really'))).toBeNull()
  })

  test('returns null rather than throwing on a truncated header', () => {
    expect(readImageSize(Buffer.from([0xff, 0xd8, 0xff]))).toBeNull()
  })

  // The real gallery is the case that matters: every photo must yield sane
  // dimensions, because a null would ship a tile with no reserved box.
  test('reads every image in the gallery', () => {
    const files = readdirSync(GALLERY).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    expect(files.length).toBeGreaterThan(0)
    for (const file of files) {
      const size = readImageSize(readFileSync(join(GALLERY, file)))
      expect(size, `${file} should parse`).not.toBeNull()
      expect(size.width).toBeGreaterThan(0)
      expect(size.height).toBeGreaterThan(0)
    }
  })
})
