import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import Photography from './Photography.jsx'
import photos from '../test/galleryFixture.js'

const openFirst = async (user) => {
  const buttons = screen.getAllByRole('button', { name: /Open photograph/ })
  await user.click(buttons[0])
  return buttons[0]
}

describe('Photography', () => {
  test('renders a tile per photo with reserved dimensions', () => {
    const { container } = render(<Photography />)
    const imgs = container.querySelectorAll('.gallery-item img')
    expect(imgs).toHaveLength(photos.length)

    imgs.forEach((img, i) => {
      expect(img).toHaveAttribute('width', String(photos[i].width))
      expect(img).toHaveAttribute('height', String(photos[i].height))
      expect(img).toHaveAttribute('loading', 'lazy')
      // Filenames are meaningless, so tiles are decorative.
      expect(img).toHaveAttribute('alt', '')
    })
  })

  test('offers WebP renditions as a srcset where variants exist', () => {
    const { container } = render(<Photography />)
    const sources = container.querySelectorAll('.gallery-item source')
    expect(sources[0]).toHaveAttribute('type', 'image/webp')
    expect(sources[0].getAttribute('srcset')).toBe(
      '/one-400.webp 400w, /one-800.webp 800w',
    )
    // A photo with no variants must not emit an empty srcset.
    expect(sources[2].hasAttribute('srcset')).toBe(false)
  })

  test('opens a labelled modal dialog and moves focus into it', async () => {
    const user = userEvent.setup()
    render(<Photography />)
    await openFirst(user)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAccessibleName(`Photograph 1 of ${photos.length}`)
    expect(within(dialog).getByRole('button', { name: 'Close' })).toHaveFocus()
  })

  test('arrow keys wrap around the collection', async () => {
    const user = userEvent.setup()
    render(<Photography />)
    await openFirst(user)

    await user.keyboard('{ArrowLeft}')
    expect(screen.getByRole('dialog')).toHaveAccessibleName(
      `Photograph ${photos.length} of ${photos.length}`,
    )

    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('dialog')).toHaveAccessibleName(
      `Photograph 1 of ${photos.length}`,
    )
  })

  test('Escape closes the dialog and restores focus to the opening tile', async () => {
    const user = userEvent.setup()
    render(<Photography />)
    const opener = await openFirst(user)

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(opener).toHaveFocus()
  })

  test('locks page scrolling only while the dialog is open', async () => {
    const user = userEvent.setup()
    render(<Photography />)
    expect(document.body.style.overflow).not.toBe('hidden')

    await openFirst(user)
    expect(document.body.style.overflow).toBe('hidden')

    await user.keyboard('{Escape}')
    expect(document.body.style.overflow).not.toBe('hidden')
  })
})
