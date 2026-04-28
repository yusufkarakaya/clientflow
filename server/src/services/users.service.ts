import pool from '../db.js'

export interface User {
  id: number
  name: string
  email: string
  system_role: string
  created_at: Date
}

export interface NewUser {
  name: string
  email: string
  password: string
  system_role: string
}

export interface UserWithPassword extends User {
  password: string
}

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, system_role, created_at FROM users',
    )
    return result.rows
  } catch (error) {
    console.error('Error executing query', error)
    throw new Error('Internal Server Error')
  }
}

export const createUser = async (user: NewUser): Promise<User> => {
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, system_role, password) VALUES ($1, $2, $3, $4) RETURNING id, name, email, system_role, created_at',
      [user.name, user.email, user.system_role, user.password],
    )
    return result.rows[0]
  } catch (error) {
    console.error('Error executing query', error)
    throw new Error('Internal Server Error')
  }
}

export const getUserByEmail = async (
  email: string,
): Promise<UserWithPassword | null> => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, system_role, password, created_at FROM users WHERE email = $1',
      [email],
    )
    return result.rows[0] || null
  } catch (error) {
    console.error('Error executing query', error)
    throw new Error('Internal Server Error')
  }
}

export const getMe = async (id: number): Promise<User | null> => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, system_role, created_at FROM users WHERE id = $1',
      [id],
    )
    return result.rows[0] || null
  } catch (error) {
    console.error('Error executing query', error)
    throw new Error('Internal Server Error')
  }
}
