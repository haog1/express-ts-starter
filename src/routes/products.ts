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

router.post(
  '/',
  routeFound,
  // authMiddleware, /* if auth is required */
  validateRequest({
    name: {
      in: ['body'],
      notEmpty: true,
    },
    description: {
      in: ['body'],
      notEmpty: true,
    },
    price: {
      in: ['body'],
      notEmpty: true,
      isFloat: {
        options: {
          min: 0,
        },
      },
      toFloat: true,
    },
    deliveryPrice: {
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

router.patch(
  '/:id',
  routeFound,
  validateRequest({
    id: {
      in: ['params'],
      notEmpty: true,
      custom: validateGUID(),
    },
    name: {
      in: ['body'],
      notEmpty: true,
      optional: true,
    },
    description: {
      in: ['body'],
      notEmpty: true,
      optional: true,
    },
    price: {
      in: ['body'],
      notEmpty: true,
      optional: true,
      isFloat: {
        options: {
          min: 0,
        },
      },
      toFloat: true,
    },
    deliveryPrice: {
      in: ['body'],
      notEmpty: true,
      optional: true,
      isFloat: {
        options: {
          min: 0,
        },
      },
      toFloat: true,
    },
  }),
  productsController.updateOne,
)

router.delete(
  '/:id',
  routeFound,
  validateRequest({
    id: {
      in: ['params'],
      notEmpty: true,
      custom: validateGUID(),
    },
    force: {
      in: ['query'],
      notEmpty: true,
      optional: true,
      isBoolean: true,
      toBoolean: true,
    },
  }),
  productsController.delete,
)

export default router
