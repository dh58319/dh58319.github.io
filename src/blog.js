import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { parseFrontmatter } from './lib/frontmatter.js'

// Blog posts are authored as Markdown files in src/content/posts/*.md.
// Each file has YAML-style frontmatter at the top:
//
//   ---
//   title: My Post Title
//   date: 2024-06-18
//   summary: A short blurb shown in the blog list.
//   ---
//
//   Markdown body goes here...
//
// To link out to an external post instead of rendering a body, add a `url:` field
// to the frontmatter (the body is then ignored).
//
// The slug (used in /blog/:slug) defaults to the filename: hello-world.md
// becomes /blog/hello-world. Override it with a `slug:` frontmatter field.

const files = import.meta.glob('./content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})


const parsed = Object.entries(files).map(([path, raw]) => {
  const { data, content } = parseFrontmatter(raw)
  const slug = data.slug || path.split('/').pop().replace(/\.md$/, '')
  return {
    slug,
    path,
    title: data.title || slug,
    date: data.date || '',
    summary: data.summary || '',
    url: data.url || undefined,
    html: data.url ? '' : DOMPurify.sanitize(marked.parse(content.trim())),
  }
})

// Two posts resolving to the same slug would make one of them unreachable,
// since /blog/:slug looks up the first match. Surface it instead of hiding it.
const seen = new Map()
for (const post of parsed) {
  if (seen.has(post.slug)) {
    console.warn(
      `[blog] duplicate slug "${post.slug}": ${seen.get(post.slug)} and ${post.path} ` +
        `resolve to the same URL. Set a distinct \`slug:\` in the frontmatter.`,
    )
  }
  seen.set(post.slug, post.path)
}

// Dates are ISO (YYYY-MM-DD) by convention, which sorts correctly as text.
// Anything unparseable sorts last rather than throwing off the whole list.
const timeOf = (post) => {
  const t = Date.parse(post.date)
  return Number.isNaN(t) ? -Infinity : t
}

export const blogPosts = parsed.sort(
  (a, b) => timeOf(b) - timeOf(a) || (b.date || '').localeCompare(a.date || ''),
)
