import { useEffect, useState } from 'react'

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
        if (active) {
          setTeams(items)
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Failed to load teams')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadTeams()
    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return <p>Loading teams...</p>
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  return (
    <div className="row g-3">
      {teams.map((team) => (
        <div className="col-md-6" key={team._id}>
          <article className="card h-100 shadow-sm">
            <div className="card-body">
              <h3 className="h5 mb-2">{team.name}</h3>
              <p className="mb-1"><strong>City:</strong> {team.city}</p>
              <p className="mb-1"><strong>Coach:</strong> {team.coach}</p>
              <p className="mb-0"><strong>Members:</strong> {team.members?.length || 0}</p>
            </div>
          </article>
        </div>
      ))}
    </div>
  )
}

export default Teams
