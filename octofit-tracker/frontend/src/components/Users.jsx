import { useEffect, useState } from 'react'

// API endpoint: https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api/users/
// Falls back to http://localhost:8000/api/users/ when VITE_CODESPACE_NAME is unset.
const _codespaceName = import.meta.env.VITE_CODESPACE_NAME || ''
const _usersUrl = _codespaceName && _codespaceName !== 'undefined'
  ? `https://${_codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

import { fetchCollection } from '../lib/api'
function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadUsers() {
      try {
        const { items } = await fetchCollection('users')
        if (active) setUsers(items)
      } catch (err) {
        if (active)
          setError(err instanceof Error ? err.message : 'Failed to load users')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadUsers()
    return () => { active = false }
  }, [])

  if (loading) {
    return (
      <div className="d-flex align-items-center gap-2 text-secondary">
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
        Loading users...
      </div>
    )
  }

  if (error) {
    return <div className="alert alert-danger py-2">{error}</div>
  }

  if (users.length === 0) {
    return <p className="text-secondary">No users found.</p>
  }

  return (
    <div className="table-responsive">
      <h2 className="h5 mb-3">Users</h2>
      <table className="table table-striped table-sm align-middle">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Level</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td className="text-capitalize">{user.fitnessLevel || '—'}</td>
              <td>{user.team?.name || 'Unassigned'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
