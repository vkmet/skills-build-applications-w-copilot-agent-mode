import { useEffect, useState } from 'react'

import { fetchCollection } from '../lib/api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadActivities() {
      try {
        const { items } = await fetchCollection('activities')
        if (active) {
          setActivities(items)
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Failed to load activities')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadActivities()
    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return <p>Loading activities...</p>
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm align-middle">
        <thead>
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
              <td>{activity.caloriesBurned}</td>
              <td>{activity.distanceKm ? `${activity.distanceKm} km` : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Activities
