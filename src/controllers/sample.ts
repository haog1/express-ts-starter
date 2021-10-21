import { Request, Response, NextFunction } from 'express'
import { Ok } from '../constants'
import { SampleEventPublisher } from '../events'
import { SampleRepository } from '../repositories'

export default {
  getSampleData: (req: Request, res: Response, next: NextFunction) => {
    res.data = SampleRepository.getSampleData()
    res.code = Ok
    next()
  },
  createSampleData: async (req: Request, res: Response, next: NextFunction) => {
    const { request1, request2 } = req.body
    res.data = await SampleRepository.createSampleData({
      request1,
      request2,
    })
    // await new SampleEventPublisher(natsInstance.getClient()).publish(res.data)
    res.code = Ok
    next()
  },
}
