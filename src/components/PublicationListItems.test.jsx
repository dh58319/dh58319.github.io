import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

vi.mock('../data.js', () => ({
  publications: [
    {
      title: 'A Paper About Things',
      authors: 'D. Kim, A. Other',
      venue: 'CVPR',
      year: 2026,
      links: [{ label: 'PDF', href: 'https://example.com/paper.pdf' }],
    },
    { title: 'No Links Here', authors: 'D. Kim', venue: 'NeurIPS', year: 2025 },
  ],
}))

describe('PublicationList with entries', () => {
  test('renders each publication with venue, year and links', async () => {
    const { default: PublicationList } = await import('./PublicationList.jsx')
    render(<PublicationList />)

    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('A Paper About Things')).toBeInTheDocument()
    expect(screen.getByText('CVPR')).toBeInTheDocument()
    expect(screen.getByText(/2026/)).toBeInTheDocument()

    const pdf = screen.getByRole('link', { name: 'PDF' })
    expect(pdf).toHaveAttribute('href', 'https://example.com/paper.pdf')
    expect(pdf).toHaveAttribute('target', '_blank')
  })

  test('omits the links row for entries without links', async () => {
    const { default: PublicationList } = await import('./PublicationList.jsx')
    render(<PublicationList />)
    expect(screen.getAllByRole('link')).toHaveLength(1)
  })
})
