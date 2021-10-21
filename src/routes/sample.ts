import express from 'express'
import { authMiddleware, routeFound } from '@haog1/micro-core'

import controller from '../controllers/sample'

const router = express.Router({ mergeParams: true })

router.get('/', routeFound, controller.getSampleData)
router.post('/', routeFound, authMiddleware, controller.createSampleData)

export default router
