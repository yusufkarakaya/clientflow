import { Router } from 'express'

import { authenticateToken, authenticateCookie } from '../middleware/auth.js'

import {
  getUsers,
  addUser,
  loginUser,
  logoutUser,
  getUserInfo,
} from '../controller/users.controller.js'

const router = Router()

router.get('/', getUsers)
router.get('/me', authenticateCookie, getUserInfo)
router.get('/getUser', authenticateToken, getUserInfo)
router.post('/createUser', addUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

//PRIVATE ROUTES
router.get('/dashboard', authenticateToken, getUserInfo)

export default router
