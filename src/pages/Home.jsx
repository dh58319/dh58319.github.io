import Section from '../components/Section.jsx'
import SocialLinks from '../components/SocialLinks.jsx'
import {
  profile,
  bio,
  news,
  publications,
  education,
  experience,
  skills,
  awards,
} from '../data.js'
import profilePhoto from '../assets/profile.jpg'

export default function Home() {
  return (
    <>
      <header className="hero">
        <img className="hero-photo" src={profilePhoto} alt={profile.name} />
        <div className="hero-text">
          <h1 className="name">{profile.name}</h1>
          <p className="title">{profile.title}</p>
          <p className="affiliation">{profile.affiliation}</p>
          <SocialLinks />
        </div>
      </header>

      <Section id="bio" title="Bio">
        {bio.map((para, i) => (
          <p key={i} className="bio-para">
            {para}
          </p>
        ))}
      </Section>

      {news?.length > 0 && (
        <Section id="news" title="News">
          <ul className="news-list">
            {news.map((n, i) => (
              <li key={i} className="news-item">
                <span className="news-date">{n.date}</span>
                <span className="news-text">{n.text}</span>
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

      <Section id="education" title="Education">
        <ul className="timeline">
          {education.map((ed, i) => (
            <li key={i} className="entry">
              <div className="entry-head">
                <span className="entry-role">{ed.degree}</span>
                <span className="entry-period">{ed.period}</span>
              </div>
              <p className="entry-org">{ed.org}</p>
              {ed.note && <p className="entry-note">{ed.note}</p>}
            </li>
          ))}
        </ul>
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

      {awards?.length > 0 && (
        <Section id="awards" title="Honors & Awards">
          <ul className="timeline">
            {awards.map((a, i) => (
              <li key={i} className="entry">
                <div className="entry-head">
                  <span className="entry-role">{a.title}</span>
                  {a.year && <span className="entry-period">{a.year}</span>}
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {skills?.length > 0 && (
        <Section id="skills" title="Skills">
          <ul className="skill-list">
            {skills.map((s) => (
              <li key={s} className="skill">
                {s}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  )
}
