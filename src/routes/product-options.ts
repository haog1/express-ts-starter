import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { routeFound, validateRequest } from '../middlewares'
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
