import { Request, Response, NextFunction } from 'express'
import { BaseController } from '../controllers'
import { BaseRepository } from '../repositories'

export const injectRepository = (controller: BaseController, repository: BaseRepository) => {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      controller.setRepository(repository)
      next()
    },
  ]
}
