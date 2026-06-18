import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Research from './pages/Research.jsx'
import Photography from './pages/Photography.jsx'
import { profile } from './data.js'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/research" element={<Research />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="footer-inner">
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </div>
      </footer>
    </div>
  )
}
