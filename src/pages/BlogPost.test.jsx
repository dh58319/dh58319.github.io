import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'

vi.mock('../blog.js', () => ({
  blogPosts: [
    {
      slug: 'local',
      title: 'A Local Post',
      date: '2026-06-18',
      summary: 'Summary text',
      html: '<p>Rendered body</p>',
    },
    {
      slug: 'elsewhere',
      title: 'An External Post',
      date: '2026-05-01',
      summary: 'Lives on another site',
      url: 'https://example.com/post',
      html: '',
    },
  ],
}))

const renderAt = async (slug) => {
  const { default: BlogPost } = await import('./BlogPost.jsx')
  return render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('BlogPost', () => {
  test('renders the compiled markdown body', async () => {
    await renderAt('local')
    expect(screen.getByRole('heading', { name: 'A Local Post' })).toBeInTheDocument()
    expect(screen.getByText('Rendered body')).toBeInTheDocument()
  })

  // Regression: posts that link out have no body, so this route used to render
  // an empty article when opened directly.
  test('links out instead of showing an empty body for external posts', async () => {
    await renderAt('elsewhere')
    expect(screen.getByText('Lives on another site')).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /original site/i })
    expect(link).toHaveAttribute('href', 'https://example.com/post')
    expect(link).toHaveAttribute('target', '_blank')
  })

  test('shows a not-found state for an unknown slug', async () => {
    await renderAt('missing')
    expect(screen.getByRole('heading', { name: 'Post not found' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Back to blog/ })).toBeInTheDocument()
  })
})
