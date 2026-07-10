import { useEffect, useState } from 'react'

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
        if (active) {
          setEntries(items)
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Failed to load leaderboard')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadLeaderboard()
    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return <p>Loading leaderboard...</p>
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  return (
    <ol className="list-group list-group-numbered">
      {entries.map((entry) => (
        <li key={entry._id} className="list-group-item d-flex justify-content-between align-items-start">
          <div>
            <div className="fw-semibold">{entry.user?.fullName || 'Unknown athlete'}</div>
            <small className="text-muted">Week of {new Date(entry.weekStart).toLocaleDateString()}</small>
          </div>
          <span className="badge text-bg-primary rounded-pill">{entry.points} pts</span>
        </li>
      ))}
    </ol>
  )
}

export default Leaderboard
