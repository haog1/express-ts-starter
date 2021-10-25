import express from 'express'
import { productOptionsContoller as controller } from '../controllers'
import { routeFound, validateRequest } from '../middlewares'
import { productOptionsRepository, productsRepository } from '../repositories'

import { validateGUID } from '../utils'

const router = express.Router({ mergeParams: true })

controller.setRepository(productOptionsRepository) // inject singleton dependency
controller.setSecondRepisotry(productsRepository) // inject second singleton dependency

router.get(
  '/',
  routeFound,
  validateRequest({
    id: {
      // id is from root route file
      in: ['params'],
      notEmpty: true,
      custom: validateGUID(),
    },
  }),
  controller.getAll,
)

router.post(
  '/',
  routeFound,
  validateRequest({
    id: {
      // id is from root route file
      in: ['params'],
      notEmpty: true,
      custom: validateGUID(),
    },
    name: {
      in: ['body'],
      notEmpty: true,
    },
    description: {
      in: ['body'],
      notEmpty: true,
    },
    productId: {
      in: ['body'],
      notEmpty: true,
      custom: validateGUID(),
    },
  }),
  controller.create,
)

router.get(
  '/:optionId',
  routeFound,
  validateRequest({
    id: {
      // id is from root route file
      in: ['params'],
      notEmpty: true,
      custom: validateGUID(),
    },
    optionId: {
      in: ['params'],
      notEmpty: true,
      custom: validateGUID(),
    },
  }),
  controller.getOne,
)

router.patch(
  '/:optionId',
  routeFound,
  validateRequest({
    id: {
      in: ['params'],
      notEmpty: true,
      custom: validateGUID(),
    },
    optionId: {
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
  }),
  controller.updateOne,
)

router.delete(
  '/:optionId',
  routeFound,
  validateRequest({
    id: {
      in: ['params'],
      notEmpty: true,
      custom: validateGUID(),
    },
    optionId: {
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
  controller.delete,
)

export default router
