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
  getMe,
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

// POST /Register
export const addUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as NewUser

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: 'Name, email, and password are required' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const newUser = await createUser({
      name,
      email: email.toLowerCase(),
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
    const user = await getUserByEmail(email.toLowerCase())
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

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60, // 1 hour
    })

    res.json({
      name: user.name,
      email: user.email,
      system_role: user.system_role,
      // token,
    })
  } catch (error) {
    console.error('Error logging in user', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })
  res.json({ message: 'Logged out successfully' })
}

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const user = await getMe(req.user!.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    console.error('Error fetching user info', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const AdminDashboard = (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the admin dashboard!' })
}
