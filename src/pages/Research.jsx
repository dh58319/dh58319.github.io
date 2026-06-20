import Section from '../components/Section.jsx'
import Icon from '../components/Icon.jsx'
import PublicationList from '../components/PublicationList.jsx'
import SkillList from '../components/SkillList.jsx'
import {
  researchInterests,
  researchProjects,
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
          <SkillList items={researchInterests} />
        </Section>
      )}

      <Section id="publications" title="Publications">
        <PublicationList />
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
                {p.tags?.length > 0 && <SkillList items={p.tags} compact />}
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
