import { Router } from 'express'
import type { Request, Response } from 'express'
import pool from '../db.js'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM users')
    res.json(result.rows)
  } catch (error) {
    console.error('Error executing query', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
