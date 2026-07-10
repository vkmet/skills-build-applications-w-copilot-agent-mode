import { useEffect, useState } from 'react'

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
        if (active) {
          setUsers(items)
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Failed to load users')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadUsers()
    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return <p>Loading users...</p>
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm align-middle">
        <thead>
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
              <td className="text-capitalize">{user.fitnessLevel}</td>
              <td>{user.team?.name || 'Unassigned'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
