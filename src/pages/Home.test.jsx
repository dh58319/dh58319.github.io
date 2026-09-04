import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import Home from './Home.jsx'
import { awards, education, experience, news, skills } from '../data.js'

beforeEach(() => {
  // Section reveals immediately so content is assertable without scrolling.
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

describe('Home', () => {
  test('leads with a single h1 and a feature photograph', () => {
    render(<Home />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('img')).toHaveAccessibleName(/sailboat/i)
  })

  test('renders every data-driven section present in data.js', () => {
    render(<Home />)
    for (const title of ['Bio', 'Publications', 'Education']) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
    }
    if (news.length) expect(screen.getByRole('heading', { name: 'News' })).toBeInTheDocument()
    if (experience.length)
      expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument()
    if (awards.length)
      expect(screen.getByRole('heading', { name: 'Honors & Awards' })).toBeInTheDocument()
    if (skills.length)
      expect(screen.getByRole('heading', { name: 'Skills' })).toBeInTheDocument()
  })

  test('lists one entry per education record', () => {
    render(<Home />)
    for (const item of education) {
      expect(screen.getByText(item.degree)).toBeInTheDocument()
    }
  })
})
