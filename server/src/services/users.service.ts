import pool from '../db.js'
import bcrypyt from 'bcrypt'

export const getAllUsers = async () => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, created_at FROM users',
    )
    return result.rows
  } catch (error) {
    console.error('Error executing query', error)
    throw new Error('Internal Server Error')
  }
}

export const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const hashedPassword = await bcrypyt.hash(password, 10)
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword],
    )
    return result.rows[0]
  } catch (error) {
    console.error('Error executing query', error)
    throw new Error('Internal Server Error')
  }
}
