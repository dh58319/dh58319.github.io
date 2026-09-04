import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import Research from './Research.jsx'
import { researchInterests, researchProjects, teaching } from '../data.js'

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
})

describe('Research', () => {
  test('renders interests, projects and teaching from data.js', () => {
    render(<Research />)
    if (researchInterests.length)
      expect(
        screen.getByRole('heading', { name: 'Research Interests' }),
      ).toBeInTheDocument()
    for (const project of researchProjects) {
      expect(screen.getByText(project.title)).toBeInTheDocument()
    }
  })

  // Regression: teaching entries carry an `org` that the page never rendered.
  test('shows the institution alongside each course', () => {
    render(<Research />)
    for (const entry of teaching.filter((t) => t.org)) {
      const course = screen.getByText(new RegExp(entry.course))
      expect(course.textContent).toContain(entry.org)
    }
  })
})
