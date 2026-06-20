import Section from '../components/Section.jsx'
import SocialLinks from '../components/SocialLinks.jsx'
import PublicationList from '../components/PublicationList.jsx'
import SkillList from '../components/SkillList.jsx'
import {
  profile,
  bio,
  news,
  education,
  experience,
  skills,
  awards,
} from '../data.js'
import profilePhoto from '../assets/profile.jpg'

export default function Home() {
  return (
    <div className="home-layout">
      <aside className="home-aside">
        <div className="profile-card">
          <img className="profile-card-photo" src={profilePhoto} alt={profile.name} />
          <h1 className="name">{profile.name}</h1>
          <p className="title">{profile.title}</p>
          <p className="affiliation">{profile.affiliation}</p>
          <SocialLinks />
        </div>
      </aside>

      <div className="home-main">
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
          <PublicationList />
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
            <SkillList items={skills} />
          </Section>
        )}
      </div>
    </div>
  )
}
