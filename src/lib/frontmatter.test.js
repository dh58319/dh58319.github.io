import { describe, expect, test } from 'vitest'
import { parseFrontmatter } from './frontmatter.js'

describe('parseFrontmatter', () => {
  test('returns the whole input as body when there is no frontmatter', () => {
    const { data, content } = parseFrontmatter('Just a body.')
    expect(data).toEqual({})
    expect(content).toBe('Just a body.')
  })

  test('reads key/value pairs and leaves the body untouched', () => {
    const { data, content } = parseFrontmatter(
      '---\ntitle: Hello\ndate: 2026-06-18\n---\nBody',
    )
    expect(data).toEqual({ title: 'Hello', date: '2026-06-18' })
    expect(content).toBe('Body')
  })

  test('handles CRLF line endings', () => {
    const { data, content } = parseFrontmatter(
      '---\r\ntitle: Hello\r\ndate: 2026-06-18\r\n---\r\nBody',
    )
    expect(data).toEqual({ title: 'Hello', date: '2026-06-18' })
    expect(content).toBe('Body')
  })

  test('splits on the first colon only, so URLs and times survive', () => {
    const { data } = parseFrontmatter(
      '---\ntitle: Robots: a study\nurl: https://ex.com/a?b=1\n---\n',
    )
    expect(data.title).toBe('Robots: a study')
    expect(data.url).toBe('https://ex.com/a?b=1')
  })

  test('strips matching surrounding quotes', () => {
    const { data } = parseFrontmatter(
      '---\ntitle: "Quoted: here"\nsummary: \'single\'\n---\n',
    )
    expect(data).toEqual({ title: 'Quoted: here', summary: 'single' })
  })

  test('does not mangle a value that is a single quote character', () => {
    const { data } = parseFrontmatter('---\ntitle: "\n---\n')
    expect(data.title).toBe('"')
  })

  test('skips blank lines and comments', () => {
    const { data } = parseFrontmatter('---\n\n# a comment\ntitle: Hi\n\n---\nBody')
    expect(data).toEqual({ title: 'Hi' })
  })

  test('treats an unterminated block as body text rather than frontmatter', () => {
    const raw = '---\ntitle: Broken\nBody without close'
    const { data, content } = parseFrontmatter(raw)
    expect(data).toEqual({})
    expect(content).toBe(raw)
  })

  test('keeps an empty value as an empty string', () => {
    const { data } = parseFrontmatter('---\ntitle:\ndate: 2026-01-01\n---\nB')
    expect(data.title).toBe('')
    expect(data.date).toBe('2026-01-01')
  })

  test('trims surrounding whitespace from keys and values', () => {
    const { data } = parseFrontmatter(
      '---\ntitle: Spaced   \nsummary: Trailing.  \n---\n',
    )
    expect(data).toEqual({ title: 'Spaced', summary: 'Trailing.' })
  })

  test('ignores lines without a colon', () => {
    const { data } = parseFrontmatter('---\ntitle: Ok\nnonsense line\n---\n')
    expect(data).toEqual({ title: 'Ok' })
  })

  test('does not mistake a horizontal rule in the body for the delimiter', () => {
    const { data, content } = parseFrontmatter(
      '---\ntitle: T\n---\nBody\n\n---\n\nMore body',
    )
    expect(data).toEqual({ title: 'T' })
    expect(content).toBe('Body\n\n---\n\nMore body')
  })
})
