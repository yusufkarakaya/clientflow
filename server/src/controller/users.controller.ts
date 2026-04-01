import type { Request, Response } from 'express'

import { getAllUsers } from '../services/users.service.js'
import { createUser } from '../services/users.service.js'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers()
    res.json(users)
  } catch (error) {
    console.error('Error fetching users', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const addUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: 'Name, email, and password are required' })
  }

  try {
    const newUser = await createUser(name, email, password)
    res.status(201).json(newUser)
  } catch (error) {
    console.error('Error creating user', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
