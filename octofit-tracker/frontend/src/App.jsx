import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  ['/', 'Dashboard'],
  ['/activities', 'Activities'],
  ['/leaderboard', 'Leaderboard'],
  ['/teams', 'Teams'],
  ['/users', 'Users'],
  ['/workouts', 'Workouts'],
]

function Dashboard() {
  return (
    <section className="text-center py-5">
      <h1 className="display-5 fw-bold">Octofit Tracker</h1>
      <p className="lead text-body-secondary">
        Track your progress, discover workouts, and compete with your team.
      </p>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">
            Octofit Tracker
          </NavLink>
          <nav className="navbar-nav flex-row flex-wrap gap-2" aria-label="Main navigation">
            {navigation.map(([to, label]) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link px-2 ${isActive ? 'active fw-semibold' : ''}`
                }
                key={to}
                to={to}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-4">
        <Routes>
          <Route element={<Dashboard />} path="/" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Users />} path="/users" />
          <Route element={<Workouts />} path="/workouts" />
        </Routes>
      </main>
    </div>
  )
}

export default App
