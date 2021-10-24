import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { IsFloatOptions } from 'express-validator/src/options'
import { routeFound, validateRequest } from '../middlewares'
import { productsController } from '../controllers'
import { productRepository } from '../repositories'
import { validateGUID } from '../utils'

const router = express.Router({ mergeParams: true })

// productsController.setRepository(productRepository) // inject singleton dependency

router.get(
  '/',
  routeFound,
  validateRequest({
    guid: {
      in: ['params'],
      notEmpty: true,
      custom: validateGUID(),
    },
  }),
  (req: Request, res: Response, next: NextFunction) => {
    console.log('== req', req.params)
    next()
  },
)

export default router
