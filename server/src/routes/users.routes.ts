import { Router } from 'express'

import { getUsers } from '../controller/users.controller.js'
import { addUser } from '../controller/users.controller.js'

const router = Router()

router.get('/', getUsers)
router.post('/', addUser)

export default router
