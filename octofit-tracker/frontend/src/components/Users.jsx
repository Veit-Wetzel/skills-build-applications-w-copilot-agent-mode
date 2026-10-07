import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('/api/users/')
      .then(setUsers)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <section>
      <h1>Users</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {!error && !users.length && <p className="text-body-secondary">No users found.</p>}
      <div className="row g-3">
        {users.map((user, index) => (
          <div className="col-md-6 col-xl-4" key={user._id || user.id || index}>
            <article className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5">{user.name || 'Unnamed user'}</h2>
                <p className="mb-1">{user.email}</p>
                <p className="mb-1 text-capitalize"><strong>Fitness:</strong> {user.profile?.fitnessLevel || 'Not set'}</p>
                <p className="mb-0"><strong>Goals:</strong> {user.profile?.goals?.join(', ') || 'Not set'}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Users
