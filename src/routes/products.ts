import express from 'express'
import { routeFound, validateRequest } from '../middlewares'
import { productsController } from '../controllers'
import { productRepository } from '../repositories'

const router = express.Router({ mergeParams: true })

productsController.setRepository(productRepository) // inject singleton dependency

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
  productsController.getAll,
)

export default router
