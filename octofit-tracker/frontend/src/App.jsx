import { NavLink, Navigate, Route, Routes } from 'react-router-dom'

import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { apiBaseUrl, isCodespace } from './lib/api'
import logo from '../../../docs/octofitapp-small.png'
import './App.css'

// Read the Vite environment variable directly so it is visible in this module.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME

function App() {
  const links = [
    { to: '/users', label: 'Users' },
    { to: '/teams', label: 'Teams' },
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/workouts', label: 'Workouts' },
  ]

  return (
    <div className="app-shell container py-4 py-md-5">
      {/* Warning banner when VITE_CODESPACE_NAME is not configured */}
      {!isCodespace && (
        <div className="alert alert-warning alert-dismissible fade show py-2 mb-3" role="alert">
          <strong>VITE_CODESPACE_NAME</strong> is not set &mdash; falling back to{' '}
          <code>http://localhost:8000</code>.{' '}
          Add it to <code>.env.local</code> to reach your Codespace backend.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
        </div>
      )}

      <header className="mb-4 pb-2 border-bottom">
        <div className="d-flex align-items-center gap-3 mb-2">
          <img src={logo} className="brand-logo" alt="OctoFit" />
          <div>
            <h1 className="h3 mb-1">OctoFit Tracker</h1>
            <p className="text-secondary mb-0">Multi-tier fitness dashboard</p>
          </div>
        </div>
        <p className="small text-secondary mb-1">
          API:{' '}
          <a
            href={`${apiBaseUrl}/health`}
            target="_blank"
            rel="noreferrer"
            className="text-break"
          >
            {apiBaseUrl}
          </a>
          {codespaceName && codespaceName !== 'undefined' && (
            <span className="ms-2 badge text-bg-success">Codespace</span>
          )}
        </p>
        <nav className="nav nav-pills gap-2 flex-wrap mt-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : 'text-body'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="card shadow-sm">
        <section className="card-body">
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </section>
      </main>
    </div>
  )
}

export default App
