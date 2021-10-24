import express from 'express'
import { IsFloatOptions } from 'express-validator/src/options'
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

router.post(
  '/',
  routeFound,
  // authMiddleware, /* if auth is required */
  validateRequest({
    Name: {
      in: ['body'],
      notEmpty: true,
    },
    Description: {
      in: ['body'],
      notEmpty: true,
    },
    Price: {
      in: ['body'],
      notEmpty: true,
      isFloat: {
        options: {
          min: 0,
        },
      },
      toFloat: true,
    },
    DeliveryPrice: {
      in: ['body'],
      notEmpty: true,
      isFloat: {
        options: {
          min: 0,
        },
      },
      toFloat: true,
    },
  }),
  productsController.create,
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
