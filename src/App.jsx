import { Routes, Route, useLocation } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import ProfileCard from './components/ProfileCard.jsx'
import { useDocumentTitle } from './hooks/useDocumentTitle.js'
import { titleFor } from './lib/routes.js'
import { profile } from './data.js'

// Route-level code splitting: each page (and its dependencies, e.g. marked on
// the blog) is loaded only when that route is visited.
const Home = lazy(() => import('./pages/Home.jsx'))
const Research = lazy(() => import('./pages/Research.jsx'))
const Blog = lazy(() => import('./pages/Blog.jsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'))
const Photography = lazy(() => import('./pages/Photography.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

export default function App() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useDocumentTitle(titleFor(location.pathname))

  // Photography gives its gallery the full measure instead of the text column.
  const isWide = location.pathname === '/photography'

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <div className={`site-layout${isWide ? ' is-wide' : ''}`}>
        {!isWide && (
          <aside className="site-aside">
            <ProfileCard />
          </aside>
        )}
        <main id="main-content" className="page" key={location.pathname} tabIndex="-1">
          <Suspense fallback={<div className="route-fallback" aria-hidden="true" />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/research" element={<Research />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/photography" element={<Photography />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
      <footer className="footer">
        <div className="footer-inner">
          © {new Date().getFullYear()} {profile.name} · {profile.location}
          <span className="footer-separator" aria-hidden="true">·</span>
          <a href={`mailto:${profile.email}`}>Contact: {profile.email}</a>
        </div>
      </footer>
    </div>
  )
}
