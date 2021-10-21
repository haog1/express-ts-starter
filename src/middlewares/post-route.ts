import { BaseError } from '../errors'
import { Request, Response, NextFunction } from 'express'
import { NotFound, Ok } from '../constants'

export const postRoute = [
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BaseError) {
      return res.status(err.status).send({
        success: false,
        errors: err.serializeErrors(),
      })
    }
    next() // must have next if it's not last middleware
  },
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.foundRoute) {
      return res.status(NotFound).send({
        success: false,
        errors: [{ message: 'Route not found' }],
      })
    }
    next()
  },
  (req: Request, res: Response, next: NextFunction) => {
    return res.status(res.code || Ok).send({
      success: true,
      data: res.data,
    })
  },
]
