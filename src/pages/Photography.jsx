import { useState, useEffect, useCallback } from 'react'
import Icon from '../components/Icon.jsx'

// Auto-load every image dropped into src/assets/gallery/.
const modules = import.meta.glob(
  '../assets/gallery/*.{jpg,jpeg,png,JPG,JPEG,PNG,webp}',
  { eager: true, import: 'default' },
)

const photos = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({
    src,
    name: path.split('/').pop().replace(/\.[^.]+$/, ''),
  }))

export default function Photography() {
  const [active, setActive] = useState(null)

  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % photos.length)
      if (e.key === 'ArrowLeft')
        setActive((i) => (i - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, close])

  return (
    <>
      <div className="page-head">
        <h1 className="page-title">Photography</h1>
        <p className="page-subtitle">A selection of photographs.</p>
        <a
          className="insta-link"
          href="https://instagram.com/dobbypic"
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="instagram" size={18} />
          <span>@dobbypic</span>
        </a>
      </div>

      {photos.length === 0 ? (
        <p className="empty-note">
          No photos yet. Drop images into <code>src/assets/gallery/</code> to
          populate this gallery.
        </p>
      ) : (
        <div className="gallery">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              className="gallery-item"
              onClick={() => setActive(i)}
              aria-label={`Open ${photo.name}`}
            >
              <img src={photo.src} alt={photo.name} loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {active !== null && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <button className="lightbox-close" aria-label="Close" onClick={close}>
            ×
          </button>
          <button
            className="lightbox-nav prev"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation()
              setActive((i) => (i - 1 + photos.length) % photos.length)
            }}
          >
            ‹
          </button>
          <img
            className="lightbox-img"
            src={photos[active].src}
            alt={photos[active].name}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lightbox-nav next"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation()
              setActive((i) => (i + 1) % photos.length)
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  )
}
