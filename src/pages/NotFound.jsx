import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <p className="not-found-label">Page not found</p>
      <h1 id="not-found-title" className="page-title">
        This page is not here.
      </h1>
      <p className="page-subtitle">
        The link may be outdated, or the page may have moved.
      </p>
      <Link className="not-found-link" to="/">
        Return home
      </Link>
    </section>
  )
}
