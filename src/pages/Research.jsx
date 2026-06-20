import Section from '../components/Section.jsx'
import Icon from '../components/Icon.jsx'
import {
  researchInterests,
  researchProjects,
  publications,
  teaching,
} from '../data.js'

export default function Research() {
  return (
    <>
      <div className="page-head">
        <h1 className="page-title">Research</h1>
        <p className="page-subtitle">
          Machine learning and deep learning, with applications to VLA and Medical AI.
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
                {p.links?.length > 0 && (
                  <p className="entry-links">
                    {p.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="entry-link"
                      >
                        <Icon name={l.icon || 'external'} size={14} />
                        {l.label}
                      </a>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {teaching?.length > 0 && (
        <Section id="teaching" title="Teaching">
          <ul className="timeline">
            {teaching.map((t, i) => (
              <li key={i} className="entry">
                <div className="entry-head">
                  <span className="entry-role">{t.role}</span>
                  {t.period && <span className="entry-period">{t.period}</span>}
                </div>
                {t.course && <p className="entry-org">{t.course}</p>}
                {t.note && <p className="entry-note">{t.note}</p>}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  )
}
