import { useEffect, useState } from 'react'

import { fetchCollection } from '../lib/api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadWorkouts() {
      try {
        const { items } = await fetchCollection('workouts')
        if (active) {
          setWorkouts(items)
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Failed to load workouts')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadWorkouts()
    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return <p>Loading workouts...</p>
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  return (
    <div className="accordion" id="workoutAccordion">
      {workouts.map((workout, index) => {
        const headingId = `heading-${workout._id}`
        const collapseId = `collapse-${workout._id}`

        return (
          <div className="accordion-item" key={workout._id}>
            <h2 className="accordion-header" id={headingId}>
              <button
                className={`accordion-button ${index > 0 ? 'collapsed' : ''}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${collapseId}`}
                aria-expanded={index === 0}
                aria-controls={collapseId}
              >
                {workout.title} ({workout.durationMin} min)
              </button>
            </h2>
            <div
              id={collapseId}
              className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
              aria-labelledby={headingId}
              data-bs-parent="#workoutAccordion"
            >
              <div className="accordion-body">
                <p className="mb-2 text-capitalize">
                  <strong>Category:</strong> {workout.category} | <strong>Level:</strong> {workout.targetLevel}
                </p>
                <ul className="mb-0">
                  {(workout.exercises || []).map((exercise, exerciseIndex) => (
                    <li key={`${workout._id}-${exercise.name}-${exerciseIndex}`}>
                      {exercise.name}: {exercise.sets} x {exercise.reps} (rest {exercise.restSec}s)
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Workouts
