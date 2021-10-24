import express from 'express'
import { routeFound, validateRequest } from '../middlewares'
import { injectRepository } from '../utils'
import { productsController } from '../controllers'
import { productRepository } from '../repositories'

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
    offset: {
      in: ['query'],
      isInt: true,
      toInt: true,
      notEmpty: true,
      optional: true,
    },
    limit: {
      in: ['query'],
      isInt: true,
      toInt: true,
      notEmpty: true,
      optional: true,
    },
  }),
  injectRepository(productsController, productRepository),
  productsController.getAll,
)

export default router
