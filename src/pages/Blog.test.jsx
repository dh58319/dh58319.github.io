import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'

vi.mock('../blog.js', () => ({
  blogPosts: [
    { slug: 'local', title: 'A Local Post', date: '2026-06-18', summary: 'Summary text' },
    {
      slug: 'elsewhere',
      title: 'An External Post',
      date: '2026-05-01',
      summary: '',
      url: 'https://example.com/post',
    },
  ],
}))

describe('Blog', () => {
  test('routes internal posts in-app and external posts off-site', async () => {
    const { default: Blog } = await import('./Blog.jsx')
    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /A Local Post/ })).toHaveAttribute(
      'href',
      '/blog/local',
    )

    const external = screen.getByRole('link', { name: /An External Post/ })
    expect(external).toHaveAttribute('href', 'https://example.com/post')
    expect(external).toHaveAttribute('target', '_blank')
  })
})
