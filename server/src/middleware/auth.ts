import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization']

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' })
  }

  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Access token is missing' })
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid access token' })
    }
    req.user = req.cookies.token
    // req.user = user
    next()
  })
}
