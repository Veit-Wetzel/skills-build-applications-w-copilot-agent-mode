import { useEffect, useState } from 'react'
import { displayName, fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('/api/teams/')
      .then(setTeams)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <section>
      <h1>Teams</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {!error && !teams.length && <p className="text-body-secondary">No teams found.</p>}
      <div className="row g-3">
        {teams.map((team, index) => (
          <div className="col-md-6" key={team._id || team.id || index}>
            <article className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5">{team.name || 'Unnamed team'}</h2>
                <p className="text-body-secondary">{team.motto || 'No motto provided.'}</p>
                <h3 className="h6">Members ({team.members?.length || 0})</h3>
                <ul className="mb-0">
                  {(team.members || []).map((member, memberIndex) => (
                    <li key={member._id || member.id || memberIndex}>{displayName(member)}</li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Teams
