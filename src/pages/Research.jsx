import Section from '../components/Section.jsx'
import {
  researchInterests,
  researchProjects,
  publications,
  experience,
} from '../data.js'

export default function Research() {
  return (
    <>
      <div className="page-head">
        <h1 className="page-title">Research</h1>
        <p className="page-subtitle">
          Machine learning and deep learning, with applications to medical AI and
          autonomous driving.
        </p>
      </div>

      {researchInterests?.length > 0 && (
        <Section id="interests" title="Research Interests">
          <ul className="skill-list">
            {researchInterests.map((r) => (
              <li key={r} className="skill">
                {r}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {researchProjects?.length > 0 && (
        <Section id="projects" title="Projects">
          <ul className="timeline">
            {researchProjects.map((p, i) => (
              <li key={i} className="entry">
                <div className="entry-head">
                  <span className="entry-role">{p.title}</span>
                  {p.period && <span className="entry-period">{p.period}</span>}
                </div>
                {p.summary && <p className="entry-note">{p.summary}</p>}
                {p.tags?.length > 0 && (
                  <ul className="skill-list compact">
                    {p.tags.map((t) => (
                      <li key={t} className="skill">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section id="publications" title="Publications">
        {publications.length === 0 ? (
          <p className="empty-note">Coming soon.</p>
        ) : (
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
        )}
      </Section>

      {experience?.length > 0 && (
        <Section id="experience" title="Experience">
          <ul className="timeline">
            {experience.map((e, i) => (
              <li key={i} className="entry">
                <div className="entry-head">
                  <span className="entry-role">{e.role}</span>
                  <span className="entry-period">{e.period}</span>
                </div>
                <p className="entry-org">
                  {e.org}
                  {e.location && (
                    <span className="entry-location"> · {e.location}</span>
                  )}
                </p>
                {e.points?.length > 0 && (
                  <ul className="entry-points">
                    {e.points.map((pt, j) => (
                      <li key={j}>{pt}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  )
}
