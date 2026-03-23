import { Router } from 'express'
import type { Request, Response } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'backend is running' })
})

export default router
