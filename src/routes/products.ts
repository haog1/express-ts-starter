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
  '/:guid',
  routeFound,
  validateRequest({
    guid: {
      in: ['params'],
      notEmpty: true,
      custom: validateGUID(),
    },
  }),
  productsController.getOne,
)

router.patch(
  '/:guid',
  routeFound,
  validateRequest({
    guid: {
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
  '/:guid',
  routeFound,
  validateRequest({
    guid: {
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
