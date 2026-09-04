import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import SocialLinks from './SocialLinks.jsx'
import { profile } from '../data.js'

describe('SocialLinks', () => {
  test('opens http(s) destinations in a new tab with a safe rel', () => {
    render(<SocialLinks />)
    const external = profile.socials.filter((s) => /^https?:/i.test(s.href))
    expect(external.length).toBeGreaterThan(0)

    for (const social of external) {
      const link = screen.getByTitle(social.label)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
      expect(link).toHaveAccessibleName(`${social.label} (opens in a new tab)`)
    }
  })

  // Regression: this used to be decided by the icon name, so a mail link with
  // any other icon would have been torn out of the current tab.
  test('keeps mailto links in the same tab', () => {
    render(<SocialLinks />)
    const mail = profile.socials.filter((s) => s.href.startsWith('mailto:'))
    expect(mail.length).toBeGreaterThan(0)

    for (const social of mail) {
      const link = screen.getByTitle(social.label)
      expect(link).not.toHaveAttribute('target')
      expect(link).toHaveAccessibleName(social.label)
    }
  })

  test('hides the CV button until a CV path is configured', () => {
    render(<SocialLinks />)
    const cv = screen.queryByText('CV')
    if (profile.cv) expect(cv).toBeInTheDocument()
    else expect(cv).not.toBeInTheDocument()
  })
})
