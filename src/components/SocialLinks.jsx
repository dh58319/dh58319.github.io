import Icon from './Icon.jsx'
import { profile } from '../data.js'

export default function SocialLinks() {
  const cvHref = profile.cv
    ? import.meta.env.BASE_URL.replace(/\/$/, '') + profile.cv
    : null

  return (
    <div className="socials">
      {profile.socials?.map((s) => (
        <a
          key={s.label}
          className="social-link"
          href={s.href}
          target={s.icon === 'email' ? undefined : '_blank'}
          rel="noreferrer"
          aria-label={s.label}
          title={s.label}
        >
          <Icon name={s.icon} />
        </a>
      ))}
      {cvHref && (
        <a className="cv-button" href={cvHref} target="_blank" rel="noreferrer">
          <Icon name="download" size={16} />
          <span>CV</span>
        </a>
      )}
    </div>
  )
}
