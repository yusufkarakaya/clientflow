import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      })
      logout()
      navigate('/login')
    } catch (error) {
      console.error('Error logging out', error)
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the Dashboard!</p>

      <button
        type="button"
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )
}
