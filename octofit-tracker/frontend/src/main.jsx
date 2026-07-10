import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// Bootstrap CSS + JS bundle (required for nav-pills, accordion, alerts, badges)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import App from './App.jsx'

// VITE_CODESPACE_NAME must be set in .env.local for Codespaces support.
// See octofit-tracker/frontend/.env.local for instructions.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
