import pool from '../db.js'

export const getAllUsers = async () => {
  try {
    const result = await pool.query('SELECT * FROM users')
    return result.rows
  } catch (error) {
    console.error('Error executing query', error)
    throw new Error('Internal Server Error')
  }
}
