import { useEffect, useState } from 'react'

// Subscribes to a CSS media query so components can react to the same
// breakpoints the stylesheet uses. Keep the query strings in sync with
// styles.css — this hook exists for behaviour that CSS alone cannot express,
// such as toggling `inert` on the collapsed navigation.
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

// Below this width the navigation collapses behind the hamburger button.
export const NAV_COLLAPSE_QUERY = '(max-width: 600px)'
