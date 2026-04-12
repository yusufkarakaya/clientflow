import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

import jwt from 'jsonwebtoken'

import type { Request, Response } from 'express'
import type { NewUser, UserWithPassword } from '../services/users.service.js'

import {
  getAllUsers,
  createUser,
  getUserByEmail,
} from '../services/users.service.js'

// GET /users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers()
    res.json(users)
  } catch (error) {
    console.error('Error fetching users', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// POST /users
export const addUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as NewUser

  const hashedPassword = await bcrypt.hash(password, 10)

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: 'Name, email, and password are required' })
  }

  try {
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
      system_role: 'user',
    })
    res.status(201).json(newUser)
  } catch (error) {
    console.error('Error creating user', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Post/login
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as UserWithPassword

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  try {
    const user = await getUserByEmail(email)
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, system_role: user.system_role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' },
    )
    res.json({
      name: user.name,
      email: user.email,
      system_role: user.system_role,
      token,
    })
  } catch (error) {
    console.error('Error logging in user', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
