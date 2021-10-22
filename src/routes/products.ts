import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { routeFound, validateRequest } from '../middlewares'
import { productsController as controller } from '../controllers'
import { receiveByController } from '../utils'

const router = express.Router({ mergeParams: true })

router.get(
  '/',
  routeFound,
  // authMiddleware, /* if auth is required */
  validateRequest({
    name: {
      in: ['query'],
      notEmpty: true,
      optional: true,
    },
  }),
  (req: Request, res: Response, next: NextFunction) => controller.getAll(req, res, next),
)

export default router
