// Reads intrinsic pixel dimensions straight from an image file header.
//
// Only the handful of bytes that carry width and height are parsed, so the
// build stays dependency-free for this step; anything unrecognised returns null
// and the image simply ships without dimensions rather than failing the build.

export function readImageSize(buf) {
  // PNG: IHDR width/height are the two big-endian u32s at offset 16.
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
  }

  // WebP (VP8X / VP8 / VP8L inside a RIFF container).
  if (
    buf.length > 30 &&
    buf.toString('ascii', 0, 4) === 'RIFF' &&
    buf.toString('ascii', 8, 12) === 'WEBP'
  ) {
    const fourcc = buf.toString('ascii', 12, 16)
    if (fourcc === 'VP8X') {
      return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) }
    }
    if (fourcc === 'VP8 ') {
      return {
        width: buf.readUInt16LE(26) & 0x3fff,
        height: buf.readUInt16LE(28) & 0x3fff,
      }
    }
    if (fourcc === 'VP8L') {
      const bits = buf.readUInt32LE(21)
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 }
    }
  }

  // JPEG: walk the marker chain to the start-of-frame segment.
  if (buf.length > 4 && buf.readUInt16BE(0) === 0xffd8) {
    let offset = 2
    while (offset + 9 < buf.length) {
      if (buf[offset] !== 0xff) {
        offset++
        continue
      }
      const marker = buf[offset + 1]
      // SOF0-SOF15 carry the frame size; DHT/JPG/DAC share the range but do not.
      const isSOF =
        marker >= 0xc0 &&
        marker <= 0xcf &&
        marker !== 0xc4 &&
        marker !== 0xc8 &&
        marker !== 0xcc
      if (isSOF) {
        return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) }
      }
      // Standalone markers carry no length field.
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
        offset += 2
        continue
      }
      offset += 2 + buf.readUInt16BE(offset + 2)
    }
  }

  return null
}
