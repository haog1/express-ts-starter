import { Request, Response, NextFunction } from 'express'

export const preRoute = [
  (req: Request, res: Response, next: NextFunction) => {
    req.foundRoute = false
    next()
  },
]
