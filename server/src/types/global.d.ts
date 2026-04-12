import { Request } from 'express'

declare global {
  namespace Express {
    interface Request {
      user?: string | object | undefined
    }
  }
}
export {}
