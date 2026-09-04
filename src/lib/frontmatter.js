// Minimal YAML-ish frontmatter reader for the Markdown posts in
// src/content/posts. It deliberately supports only flat `key: value` pairs —
// the shape the blog actually uses — rather than pulling in a YAML parser.
//
//   ---
//   title: My Post Title
//   date: 2024-06-18
//   summary: A short blurb shown in the blog list.
//   ---
//
//   Markdown body goes here...

const DELIMITER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

export function parseFrontmatter(raw) {
  const match = DELIMITER.exec(raw)
  if (!match) return { data: {}, content: raw }

  const data = {}
  for (const line of match[1].split('\n')) {
    const trimmed = line.trim()
    // Skip blank lines and comments so they never become bogus keys.
    if (!trimmed || trimmed.startsWith('#')) continue

    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    if (!key) continue

    // Only the first colon splits, so values may contain colons (URLs, times).
    let val = line.slice(idx + 1).trim()
    // Length guard: a value that is a single quote character is not a quoted
    // empty string, and stripping it would corrupt the value.
    if (
      val.length > 1 &&
      ((val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'")))
    ) {
      val = val.slice(1, -1)
    }
    data[key] = val
  }

  return { data, content: raw.slice(match[0].length) }
}
