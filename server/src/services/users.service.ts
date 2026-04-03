import pool from '../db.js'
import bcrypt from 'bcrypt'

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
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const result = await pool.query(
      'INSERT INTO users (name, email, system_role, password) VALUES ($1, $2, $3, $4) RETURNING id, name, email, system_role, created_at',
      [user.name, user.email, hashedPassword],
    )
    return result.rows[0]
  } catch (error) {
    console.error('Error executing query', error)
    throw new Error('Internal Server Error')
  }
}
