import { Request } from 'express'

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; name: string; email: string; system_role: string }
    }
  }
}
export {}
