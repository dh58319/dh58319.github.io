// Single source of truth for route metadata: the app uses it to set document
// titles at runtime, and the build uses it to pre-render one real HTML file per
// route so GitHub Pages serves a 200 with the right <title> and Open Graph tags
// instead of falling back to 404.html.

export const SITE = {
  origin: 'https://dh58319.github.io',
  name: 'Donghyun Kim',
}

const suffix = ` — ${SITE.name}`

export const STATIC_ROUTES = [
  {
    path: '/',
    title: `${SITE.name} — Research Portfolio`,
    description:
      'Ph.D. student in Artificial Intelligence at Ajou University. Machine learning, Vision-Language-Action models, and embodied AI.',
  },
  {
    path: '/research',
    title: `Research${suffix}`,
    description:
      'Research interests, publications, projects and teaching in machine learning, Vision-Language-Action models and Medical AI.',
  },
  {
    path: '/photography',
    title: `Photography${suffix}`,
    description: 'A selection of photographs by Donghyun Kim.',
  },
  {
    path: '/blog',
    title: `Blog${suffix}`,
    description:
      'Notes on research, engineering, and things I learn along the way.',
  },
]

export const NOT_FOUND_TITLE = `Page not found${suffix}`

// GitHub Pages serves each pre-rendered route from a directory, so it redirects
// /research to /research/. Client-side navigation produces the unslashed form.
// Both have to resolve to the same route.
export function normalizePath(pathname) {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1)
  return pathname
}

// The URL a route should declare as canonical: the trailing-slash form the
// server actually settles on, so the canonical link never points at a redirect.
export function canonicalUrl(path) {
  return path === '/' ? `${SITE.origin}/` : `${SITE.origin}${path}/`
}

export function titleFor(pathname) {
  const path = normalizePath(pathname)
  const match = STATIC_ROUTES.find((r) => r.path === path)
  if (match) return match.title
  if (path.startsWith('/blog/')) return `Blog${suffix}`
  return NOT_FOUND_TITLE
}
