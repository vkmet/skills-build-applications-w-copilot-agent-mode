import { useEffect, useState } from 'react'

import { fetchCollection } from '../lib/api'

// Fetches from: /api/activities/ — supports both array and paginated responses.
function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadActivities() {
      try {
        const { items } = await fetchCollection('activities')
        if (active) setActivities(items)
      } catch (err) {
        if (active)
          setError(err instanceof Error ? err.message : 'Failed to load activities')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadActivities()
    return () => { active = false }
  }, [])

  if (loading) {
    return (
      <div className="d-flex align-items-center gap-2 text-secondary">
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
        Loading activities...
      </div>
    )
  }

  if (error) {
    return <div className="alert alert-danger py-2">{error}</div>
  }

  if (activities.length === 0) {
    return <p className="text-secondary">No activities found.</p>
  }

  return (
    <div className="table-responsive">
      <h2 className="h5 mb-3">Activities</h2>
      <table className="table table-hover table-sm align-middle">
        <thead className="table-light">
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Calories</th>
            <th>Distance</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id}>
              <td>{activity.user?.fullName || 'Unknown'}</td>
              <td className="text-capitalize">{activity.type}</td>
              <td>{activity.durationMin} min</td>
              <td>{activity.caloriesBurned ?? '—'}</td>
              <td>{activity.distanceKm ? `${activity.distanceKm} km` : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Activities
