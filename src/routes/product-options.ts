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

export default router
