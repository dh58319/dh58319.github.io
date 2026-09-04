import Icon from './Icon.jsx'
import { profile } from '../data.js'

// mailto: and tel: links must stay in the same tab; everything else is a real
// destination that should open alongside the site. Deriving this from the href
// keeps it correct when a new social platform is added to data.js.
const isExternal = (href) => /^https?:/i.test(href)

export default function SocialLinks() {
  const cvHref = profile.cv
    ? import.meta.env.BASE_URL.replace(/\/$/, '') + profile.cv
    : null

  return (
    <div className="socials">
      {profile.socials?.map((s) => {
        const external = isExternal(s.href)
        return (
          <a
            key={s.label}
            className="social-link"
            href={s.href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
            aria-label={external ? `${s.label} (opens in a new tab)` : s.label}
            title={s.label}
          >
            <Icon name={s.icon} />
          </a>
        )
      })}
      {cvHref && (
        <a
          className="cv-button"
          href={cvHref}
          target="_blank"
          rel="noreferrer"
          aria-label="Download CV (opens in a new tab)"
        >
          <Icon name="download" size={16} />
          <span>CV</span>
        </a>
      )}
    </div>
  )
}
