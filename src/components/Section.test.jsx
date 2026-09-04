import { act, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import Section from './Section.jsx'

let observed
beforeEach(() => {
  observed = []
  // jsdom has no IntersectionObserver; capture the callback so the test can
  // drive the reveal instead of waiting on layout.
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(cb) {
        this.cb = cb
        observed.push(this)
      }
      observe() {}
      disconnect() {
        this.disconnected = true
      }
    },
  )
})

describe('Section', () => {
  test('renders its title and children', () => {
    render(
      <Section id="bio" title="Bio">
        <p>Body copy</p>
      </Section>,
    )
    expect(screen.getByRole('heading', { name: 'Bio' })).toBeInTheDocument()
    expect(screen.getByText('Body copy')).toBeInTheDocument()
  })

  test('starts hidden and reveals once it intersects', () => {
    const { container } = render(<Section id="bio" title="Bio" />)
    const section = container.querySelector('section')
    expect(section).toHaveClass('reveal')
    expect(section).not.toHaveClass('in-view')

    act(() => observed[0].cb([{ isIntersecting: true }]))
    expect(section).toHaveClass('in-view')
  })

  // Revealing is one-way: the observer is dropped so scrolling back up does not
  // re-run the animation.
  test('stops observing after the first reveal', () => {
    render(<Section id="bio" title="Bio" />)
    act(() => observed[0].cb([{ isIntersecting: true }]))
    expect(observed[0].disconnected).toBe(true)
  })
})
