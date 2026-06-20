import { publications } from '../data.js'

// Shared publications renderer used on Home and Research.
export default function PublicationList() {
  if (publications.length === 0) {
    return <p className="empty-note">Coming soon.</p>
  }

  return (
    <ol className="pub-list">
      {publications.map((p, i) => (
        <li key={i} className="pub">
          <p className="pub-title">{p.title}</p>
          <p className="pub-authors">{p.authors}</p>
          <p className="pub-venue">
            <span className="pub-venue-name">{p.venue}</span>, {p.year}
          </p>
          {p.links?.length > 0 && (
            <p className="pub-links">
              {p.links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              ))}
            </p>
          )}
        </li>
      ))}
    </ol>
  )
}
