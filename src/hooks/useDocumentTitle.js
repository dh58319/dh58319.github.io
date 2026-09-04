import { useEffect } from 'react'

// Each route is now its own URL, so it should also be its own document title —
// for browser history, for shared links, and for search results.
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title])
}
