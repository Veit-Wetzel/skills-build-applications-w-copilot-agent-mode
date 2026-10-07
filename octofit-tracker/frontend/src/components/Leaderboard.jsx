import { useEffect, useState } from 'react'
import { displayName, fetch } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/leaderboard/')
      .then(setEntries)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <section>
      <h1>Leaderboard</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {!error && !entries.length && <p className="text-body-secondary">No leaderboard entries found.</p>}
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead><tr><th>Rank</th><th>Athlete</th><th>Points</th><th>Period</th></tr></thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={entry._id || entry.id || index}>
                <td>{entry.rank ?? index + 1}</td>
                <td>{displayName(entry.user)}</td>
                <td>{entry.points ?? 0}</td>
                <td className="text-capitalize">{entry.period || 'all-time'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Leaderboard
