import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles.css'

// The site used hash routing until clean URLs replaced it. Anything already
// bookmarked or linked as /#/research still needs to land on /research, so
// translate the legacy form before the router reads the location.
const legacy = window.location.hash
if (legacy.startsWith('#/')) {
  const target = legacy.slice(1)
  window.history.replaceState(null, '', import.meta.env.BASE_URL.replace(/\/$/, '') + target)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
