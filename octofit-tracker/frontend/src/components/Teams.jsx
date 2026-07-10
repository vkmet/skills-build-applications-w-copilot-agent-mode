import { useEffect, useState } from 'react'

// API endpoint: https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api/teams/
// Falls back to http://localhost:8000/api/teams/ when VITE_CODESPACE_NAME is unset.
const _codespaceName = import.meta.env.VITE_CODESPACE_NAME || ''
const _teamsUrl = _codespaceName && _codespaceName !== 'undefined'
  ? `https://${_codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

import { fetchCollection } from '../lib/api'
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
