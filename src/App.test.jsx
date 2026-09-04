import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import App from './App.jsx'

beforeEach(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(cb) {
        this.cb = cb
      }
      observe() {
        this.cb([{ isIntersecting: true }])
      }
      disconnect() {}
    },
  )
  window.scrollTo = vi.fn()
})

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )

describe('App', () => {
  test('gives each route its own document title', async () => {
    renderAt('/research')
    await waitFor(() => expect(document.title).toMatch(/^Research — /))
  })

  test('titles unknown routes as not found', async () => {
    renderAt('/nope')
    await waitFor(() => expect(document.title).toMatch(/^Page not found — /))
  })

  test('exposes a skip link and a single main landmark', async () => {
    renderAt('/')
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute(
      'href',
      '#main-content',
    )
    await waitFor(() => expect(screen.getByRole('main')).toBeInTheDocument())
  })

  // Photography trades the profile aside for the full width of the page.
  test('drops the aside on the photography route only', async () => {
    const { container, unmount } = renderAt('/')
    await waitFor(() => expect(container.querySelector('.site-aside')).toBeInTheDocument())
    unmount()

    const wide = renderAt('/photography')
    await waitFor(() =>
      expect(wide.container.querySelector('.site-layout')).toHaveClass('is-wide'),
    )
    expect(wide.container.querySelector('.site-aside')).not.toBeInTheDocument()
  })
})
