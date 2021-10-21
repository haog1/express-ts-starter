import { Request, Response, NextFunction } from 'express'

export const routeFound = (req: Request, res: Response, next: NextFunction) => {
  req.foundRoute = true
  next()
}
