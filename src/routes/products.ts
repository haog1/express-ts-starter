import express from 'express'
import { routeFound, validateRequest } from '../middlewares'
import { productsController } from '../controllers'
import { productRepository } from '../repositories'
import { validateGUID } from '../utils'

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

router.get(
  '/:id',
  routeFound,
  validateRequest({
    id: {
      in: ['params'],
      notEmpty: true,
      custom: validateGUID(),
    },
  }),
  productsController.getOne,
)

export default router
