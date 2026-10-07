import { useEffect, useState } from 'react'
import { fetch } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/workouts/')
      .then(setWorkouts)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <section>
      <h1>Workouts</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {!error && !workouts.length && <p className="text-body-secondary">No workouts found.</p>}
      <div className="row g-3">
        {workouts.map((workout, index) => (
          <div className="col-md-6" key={workout._id || workout.id || index}>
            <article className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5">{workout.name || 'Workout'}</h2>
                <p>{workout.description}</p>
                <span className="badge text-bg-primary text-capitalize me-2">{workout.difficulty || 'all levels'}</span>
                <span>{workout.durationMinutes || 0} minutes</span>
                {workout.exercises?.length > 0 && (
                  <ul className="mt-3 mb-0">
                    {workout.exercises.map((exercise, exerciseIndex) => (
                      <li key={exercise._id || exerciseIndex}>
                        {exercise.name}: {exercise.sets} sets × {exercise.repetitions} reps
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Workouts
