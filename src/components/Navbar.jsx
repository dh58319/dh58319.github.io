import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { profile } from '../data.js'
import { useMediaQuery, NAV_COLLAPSE_QUERY } from '../hooks/useMediaQuery.js'
import ThemeToggle from './ThemeToggle.jsx'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/research', label: 'Research' },
  { to: '/photography', label: 'Photography' },
  { to: '/blog', label: 'Blog' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const isCollapsed = useMediaQuery(NAV_COLLAPSE_QUERY)

  // Escape closes the collapsed menu and returns focus to the control that
  // opened it, so keyboard users are not left stranded inside a hidden panel.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          {profile.name}
        </NavLink>

        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={`nav-links ${open ? 'open' : ''}`}
          inert={!open && isCollapsed ? '' : undefined}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
