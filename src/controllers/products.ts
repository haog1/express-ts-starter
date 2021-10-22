import { Request, Response, NextFunction } from 'express'
import { BaseController } from '.'
import { BadRequest, Ok } from '../constants'
import { NoRepositoryError } from '../errors'
import { IModel } from '../models/contract'
import { IRepository } from '../repositories/contract'
import { GUID } from '../types/guid'

export class ProductsController extends BaseController {
  constructor(repo?: IRepository<IModel<GUID>>) {
    super(repo)
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void | never> {
    try {
      if (!this._repository) {
        throw new NoRepositoryError()
      }
      res.data = await this._repository.getAll()
      res.code = Ok
      next()
    } catch (error) {
      console.error('err = ', error)
      res.code = BadRequest
      throw error
    }
  }
}
