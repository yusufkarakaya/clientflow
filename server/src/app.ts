import dotenv from 'dotenv'
dotenv.config()

import pool from './db.js'
import express from 'express'

const app = express()

import healthRoutes from './routes/health.routes.js'

app.use(express.json())

app.use('/api/health', healthRoutes)

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users')
    res.json(result.rows)
  } catch (error) {
    console.error('Error executing query', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default app
