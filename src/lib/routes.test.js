import { describe, expect, test } from 'vitest'
import {
  canonicalUrl,
  normalizePath,
  NOT_FOUND_TITLE,
  SITE,
  STATIC_ROUTES,
  titleFor,
} from './routes.js'

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

  // Regression: GitHub Pages redirects /research to /research/, and titleFor
  // used to miss on the slashed form, so the tab read "Page not found" on a
  // page that had rendered correctly.
  test('titleFor resolves the trailing-slash form the server redirects to', () => {
    for (const route of STATIC_ROUTES) {
      const slashed = route.path === '/' ? '/' : `${route.path}/`
      expect(titleFor(slashed), slashed).toBe(route.title)
    }
    expect(titleFor('/blog/hello-world/')).toBe(`Blog — ${SITE.name}`)
  })

  test('normalizePath strips only a trailing slash, never the root', () => {
    expect(normalizePath('/research/')).toBe('/research')
    expect(normalizePath('/research')).toBe('/research')
    expect(normalizePath('/')).toBe('/')
  })

  // A canonical that redirects wastes a hop and splits consolidation, so it has
  // to name the URL the server actually settles on.
  test('canonicalUrl names the served form', () => {
    expect(canonicalUrl('/')).toBe(`${SITE.origin}/`)
    expect(canonicalUrl('/research')).toBe(`${SITE.origin}/research/`)
    expect(canonicalUrl('/blog/hello-world')).toBe(`${SITE.origin}/blog/hello-world/`)
  })
})
