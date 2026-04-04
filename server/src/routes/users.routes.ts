import { Router } from 'express'

import { getUsers, addUser, loginUser } from '../controller/users.controller.js'

const router = Router()

router.get('/', getUsers)
router.post('/', addUser)
router.post('/login', loginUser)

export default router
