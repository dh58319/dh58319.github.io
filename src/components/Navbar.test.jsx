import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import Navbar from './Navbar.jsx'

// Drives the (max-width: 600px) query the collapsed navigation depends on.
function setViewportCollapsed(collapsed) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: collapsed && query.includes('600px'),
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }))
}

const renderNav = () =>
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  )

describe('Navbar', () => {
  beforeEach(() => setViewportCollapsed(true))

  test('marks the collapsed menu inert so its links leave the tab order', () => {
    renderNav()
    const nav = screen.getByRole('navigation', { hidden: true })
    expect(nav).toHaveAttribute('inert')
  })

  test('drops inert and reports expanded state once opened', async () => {
    const user = userEvent.setup()
    renderNav()
    const toggle = screen.getByRole('button', { name: 'Toggle navigation' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation')).not.toHaveAttribute('inert')
  })

  test('Escape closes the menu and returns focus to the toggle', async () => {
    const user = userEvent.setup()
    renderNav()
    const toggle = screen.getByRole('button', { name: 'Toggle navigation' })

    await user.click(toggle)
    await user.keyboard('{Escape}')

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveFocus()
  })

  test('never applies inert on wide viewports, where the menu is always visible', () => {
    setViewportCollapsed(false)
    renderNav()
    expect(screen.getByRole('navigation')).not.toHaveAttribute('inert')
  })
})
