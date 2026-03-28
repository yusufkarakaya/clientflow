import type { Request, Response } from 'express'

import { getAllUsers } from '../services/users.service.js'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers()
    res.json(users)
  } catch (error) {
    console.error('Error fetching users', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
