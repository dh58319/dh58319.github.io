import { marked } from 'marked'

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

function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw)
  if (!match) return { data: {}, content: raw }

  const data = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let val = line.slice(idx + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    data[key] = val
  }
  return { data, content: raw.slice(match[0].length) }
}

export const blogPosts = Object.entries(files)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    const slug = data.slug || path.split('/').pop().replace(/\.md$/, '')
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      summary: data.summary || '',
      url: data.url || undefined,
      html: data.url ? '' : marked.parse(content.trim()),
    }
  })
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
