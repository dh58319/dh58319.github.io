import { Routes, Route, useLocation } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import { profile } from './data.js'

// Route-level code splitting: each page (and its dependencies, e.g. marked on
// the blog) is loaded only when that route is visited.
const Home = lazy(() => import('./pages/Home.jsx'))
const Research = lazy(() => import('./pages/Research.jsx'))
const Blog = lazy(() => import('./pages/Blog.jsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'))
const Photography = lazy(() => import('./pages/Photography.jsx'))

export default function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="app">
      <Navbar />
      <main className={`page${isHome ? ' page-home' : ''}`} key={location.pathname}>
        <Suspense fallback={<div className="route-fallback" aria-hidden="true" />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <footer className="footer">
        <div className="footer-inner">
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </div>
      </footer>
    </div>
  )
}
