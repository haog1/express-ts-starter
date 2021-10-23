import express from 'express'
import { routeFound, validateRequest } from '../middlewares'
import { productsController as controller } from '../controllers'

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
  }),
  controller.getAll,
)

export default router
