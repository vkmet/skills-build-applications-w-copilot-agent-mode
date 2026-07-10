import { useEffect, useState } from 'react'

import { fetchCollection } from '../lib/api'

// Fetches from: /api/teams/ — supports both array and paginated responses.
function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadTeams() {
      try {
        const { items } = await fetchCollection('teams')
        if (active) setTeams(items)
      } catch (err) {
        if (active)
          setError(err instanceof Error ? err.message : 'Failed to load teams')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadTeams()
    return () => { active = false }
  }, [])

  if (loading) {
    return (
      <div className="d-flex align-items-center gap-2 text-secondary">
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
        Loading teams...
      </div>
    )
  }

  if (error) {
    return <div className="alert alert-danger py-2">{error}</div>
  }

  if (teams.length === 0) {
    return <p className="text-secondary">No teams found.</p>
  }

  return (
    <>
      <h2 className="h5 mb-3">Teams</h2>
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-6" key={team._id}>
            <article className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h5 mb-2">{team.name}</h3>
                <p className="mb-1"><strong>City:</strong> {team.city || '—'}</p>
                <p className="mb-1"><strong>Coach:</strong> {team.coach || '—'}</p>
                <p className="mb-0">
                  <strong>Members:</strong> {team.members?.length ?? 0}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </>
  )
}

export default Teams
