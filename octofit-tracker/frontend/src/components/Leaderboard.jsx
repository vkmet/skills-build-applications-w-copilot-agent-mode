import { useEffect, useState } from 'react'

// API endpoint: https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api/leaderboard/
// Falls back to http://localhost:8000/api/leaderboard/ when VITE_CODESPACE_NAME is unset.
const _codespaceName = import.meta.env.VITE_CODESPACE_NAME || ''
const _leaderboardUrl = _codespaceName && _codespaceName !== 'undefined'
  ? `https://${_codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

import { fetchCollection } from '../lib/api'
function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadLeaderboard() {
      try {
        const { items } = await fetchCollection('leaderboard')
        if (active) setEntries(items)
      } catch (err) {
        if (active)
          setError(err instanceof Error ? err.message : 'Failed to load leaderboard')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadLeaderboard()
    return () => { active = false }
  }, [])

  if (loading) {
    return (
      <div className="d-flex align-items-center gap-2 text-secondary">
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
        Loading leaderboard...
      </div>
    )
  }

  if (error) {
    return <div className="alert alert-danger py-2">{error}</div>
  }

  if (entries.length === 0) {
    return <p className="text-secondary">No leaderboard entries found.</p>
  }

  return (
    <>
      <h2 className="h5 mb-3">Leaderboard</h2>
      <ol className="list-group list-group-numbered">
        {entries.map((entry) => (
          <li
            key={entry._id}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div>
              <div className="fw-semibold">{entry.user?.fullName || 'Unknown athlete'}</div>
              <small className="text-muted">
                Week of {new Date(entry.weekStart).toLocaleDateString()}
              </small>
            </div>
            <span className="badge text-bg-primary rounded-pill">{entry.points} pts</span>
          </li>
        ))}
      </ol>
    </>
  )
}

export default Leaderboard
