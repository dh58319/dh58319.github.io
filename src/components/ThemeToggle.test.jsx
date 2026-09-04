import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import ThemeToggle from './ThemeToggle.jsx'

const setPrefersDark = (dark) => {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: dark && query.includes('dark'),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }))
}

beforeEach(() => {
  document.documentElement.removeAttribute('data-theme')
  localStorage.clear()
  setPrefersDark(false)
})

afterEach(() => vi.restoreAllMocks())

describe('ThemeToggle', () => {
  // index.html stamps data-theme before first paint; the component must adopt
  // that value rather than recomputing it, or the two disagree and it flashes.
  test('adopts the theme already applied to the document', () => {
    document.documentElement.setAttribute('data-theme', 'dark')
    render(<ThemeToggle />)
    expect(
      screen.getByRole('button', { name: 'Switch to light mode' }),
    ).toBeInTheDocument()
  })

  test('falls back to the OS preference when no theme was applied', () => {
    setPrefersDark(true)
    render(<ThemeToggle />)
    expect(
      screen.getByRole('button', { name: 'Switch to light mode' }),
    ).toBeInTheDocument()
  })

  test('defaults to light when nothing indicates otherwise', () => {
    render(<ThemeToggle />)
    expect(
      screen.getByRole('button', { name: 'Switch to dark mode' }),
    ).toBeInTheDocument()
  })

  test('toggling updates the document and persists the choice', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    await user.click(screen.getByRole('button', { name: 'Switch to dark mode' }))

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  test('still toggles when storage throws, e.g. private browsing', async () => {
    const setItem = vi
      .spyOn(window.localStorage, 'setItem')
      .mockImplementation(() => {
        throw new Error('storage disabled')
      })
    const user = userEvent.setup()
    render(<ThemeToggle />)

    await user.click(screen.getByRole('button', { name: 'Switch to dark mode' }))

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    setItem.mockRestore()
  })
})
