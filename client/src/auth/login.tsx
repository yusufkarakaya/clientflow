import React from 'react'

import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        setError(null)
        login()
        navigate('/dashboard')
      } else {
        setError('Invalid email or password. Please try again.')
        const errorData = await response.json()
        console.error('Login failed:', errorData)
      }
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  return (
    <div className="min-h-screen justify-center items-center flex flex-col min-w-full bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-(--text-100) ">
          Welcome Back
        </h1>
        <div>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium block mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="block border  w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent-200)"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              className="block border w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent-200)"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          <button
            className="bg-(--primary-100) hover:bg-(--primary-200) transition text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-(--primary-200) cursor-pointer w-full"
            type="submit"
          >
            Login bro
          </button>

          <div>
            <p className="text-sm text-center">
              Don't have an account?{' '}
              <a
                href="/register"
                className="text-(--accent-200) hover:underline cursor-pointer"
              >
                Register here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
