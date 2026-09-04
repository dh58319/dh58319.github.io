import { describe, expect, test } from 'vitest'
import { NOT_FOUND_TITLE, SITE, STATIC_ROUTES, titleFor } from './routes.js'

describe('route metadata', () => {
  test('every static route carries a title and description for pre-rendering', () => {
    for (const route of STATIC_ROUTES) {
      expect(route.path.startsWith('/'), route.path).toBe(true)
      expect(route.title).toBeTruthy()
      expect(route.description).toBeTruthy()
    }
  })

  test('paths are unique, so pre-rendering cannot overwrite a page', () => {
    const paths = STATIC_ROUTES.map((r) => r.path)
    expect(new Set(paths).size).toBe(paths.length)
  })

  test('titleFor resolves each static route', () => {
    for (const route of STATIC_ROUTES) {
      expect(titleFor(route.path)).toBe(route.title)
    }
  })

  test('titleFor gives blog posts the blog title', () => {
    expect(titleFor('/blog/hello-world')).toBe(`Blog — ${SITE.name}`)
  })

  test('titleFor falls back to not-found for unknown paths', () => {
    expect(titleFor('/nope')).toBe(NOT_FOUND_TITLE)
    expect(titleFor('/research/extra')).toBe(NOT_FOUND_TITLE)
  })

  test('origin has no trailing slash, so path concatenation stays valid', () => {
    expect(SITE.origin).not.toMatch(/\/$/)
  })
})
