import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Index } from './Index'
import { Login } from './auth/login'
import { Register } from './auth/register'

import Dashboard from './dashboard/dashboard'

import PrivateRoute from './components/PrivateRoutes'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
