import { useEffect, useState } from 'react'
import { displayName, fetch } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/activities/')
      .then(setActivities)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <section>
      <h1>Activities</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {!error && !activities.length && <p className="text-body-secondary">No activities found.</p>}
      <div className="row g-3">
        {activities.map((activity, index) => (
          <div className="col-md-6 col-xl-4" key={activity._id || activity.id || index}>
            <article className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5 text-capitalize">{activity.type || 'Activity'}</h2>
                <p className="mb-1"><strong>Athlete:</strong> {displayName(activity.user)}</p>
                <p className="mb-1"><strong>Duration:</strong> {activity.durationMinutes} minutes</p>
                <p className="mb-1"><strong>Distance:</strong> {activity.distanceKm ?? 0} km</p>
                <p className="mb-0"><strong>Calories:</strong> {activity.calories ?? 0}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Activities
