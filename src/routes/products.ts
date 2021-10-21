import express from 'express'
import { routeFound, validateRequest } from '../middlewares'
import { ProductsController } from '../controllers'
import { ProductsRepository } from '../repositories'

const router = express.Router({ mergeParams: true })

const repo = new ProductsRepository()
const controller = new ProductsController(repo)

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
  controller.getAll,
)

export default router
