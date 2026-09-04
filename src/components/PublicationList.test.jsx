import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

// The component reads the module-level publications array, so the data module
// is mocked per case rather than depending on whatever is in data.js today.
vi.mock('../data.js', () => ({ publications: [] }))

describe('PublicationList', () => {
  test('shows a placeholder when there is nothing to list', async () => {
    const { default: PublicationList } = await import('./PublicationList.jsx')
    render(<PublicationList />)
    expect(screen.getByText(/will appear here/i)).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })
})
