import { Navigate } from 'react-router-dom'
import type { JSX } from 'react/jsx-dev-runtime'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return null

  return isAuthenticated ? children : <Navigate to="/login" />
}

export default PrivateRoute
