import express, { Request, Response, NextFunction } from 'express'
import { routeFound, validateRequest } from '../middlewares'
import { ProductsController } from '../controllers'
import { ProductsRepository } from '../repositories'

const router = express.Router({ mergeParams: true })

const repo = new ProductsRepository()

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
  (req: Request, res: Response, next: NextFunction) => new ProductsController(repo).getAll(req, res, next),
)

export default router
