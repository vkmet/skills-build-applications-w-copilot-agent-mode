import { NavLink, Navigate, Route, Routes } from 'react-router-dom'

import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { apiBaseUrl } from './lib/api'
import logo from '../../../docs/octofitapp-small.png'
import './App.css'

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
      <header className="mb-4 pb-2 border-bottom">
        <div className="d-flex align-items-center gap-3 mb-2">
          <img src={logo} className="brand-logo" alt="OctoFit" />
          <div>
            <h1 className="h3 mb-1">OctoFit Tracker</h1>
            <p className="text-secondary mb-0">Modern multi-tier dashboard</p>
          </div>
        </div>
        <p className="small text-secondary mb-3">
          API base URL: <span className="text-break">{apiBaseUrl}</span>
        </p>
        <nav className="nav nav-pills gap-2 flex-wrap">
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
