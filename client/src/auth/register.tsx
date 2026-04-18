import React from 'react'

import { useState } from 'react'

export const Register: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/users/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      if (response.ok) {
        setError(null)
        const data = await response.json()
        console.log('Registration successful:', data)
        // Optionally, redirect to login page or store token
      } else {
        setError('Registration failed. Please try again.')
        const errorData = await response.json()
        console.error('Registration failed:', errorData)
      }
    } catch (error) {
      console.error('Error during registration:', error)
    }
  }

  return (
    <div className="min-h-screen justify-center items-center flex flex-col min-w-full bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-(--text-100) ">
          Create an Account
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
            <label htmlFor="username" className="text-sm font-medium block mb-1">Username</label>
            <input
            className="block border  w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent-200)"
            type="text"
            id="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            />
          </div>
          <div>
            <label
              className="text-sm font-medium block mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="block border  w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent-200)"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-(--primary-100) text-white py-2 rounded-md hover:bg-(--primary-200) transition-colors cursor-pointer"
            type="submit"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-(--accent-200) hover:underline cursor-pointer"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
