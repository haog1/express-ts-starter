import { Request, Response, NextFunction } from 'express'
import { BaseController } from '.'
import { BadRequest, Ok } from '../constants'
import { NoRepositoryError } from '../errors'
import { IBaseModel } from '../models/contract'
import { IRepository } from '../repositories/contract'
import { GUID } from '../types/guid'

export class ProductsController extends BaseController {
  constructor(public repo: IRepository<IBaseModel<GUID>>) {
    super(repo)
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void | never> {
    try {
      console.log('== repo', this.repo)
      if (!this.repository) {
        throw new NoRepositoryError()
      }
      res.data = await this.repository.getAll()
      res.code = Ok
      next()
    } catch (error) {
      console.error('err = ', error)
      res.code = BadRequest
      throw error
    }
  }
}
