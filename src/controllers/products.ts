import { Request, Response, NextFunction } from 'express'
import { BaseController } from './base'
import { BadRequest, Ok } from '../constants'
import { NoRepositoryError } from '../errors'
import { IModel } from '../models/contract'
import { GetProductsParameters } from '../parameters/products'
import { IRepository } from '../repositories/contract'
import { GUID } from '../types/guid'

export class ProductsController extends BaseController {
  constructor(repo?: IRepository<IModel<GUID>>) {
    super(repo)
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void | never> => {
    try {
      if (!this._repository) {
        throw new NoRepositoryError()
      }
      const { name, limit, offset } = req.query as unknown as GetProductsParameters
      if (name) {
        res.data = await this._repository.getAllByName(limit, offset, name)
        res.code = Ok
      } else {
        res.data = await this._repository.getAll(limit, offset)
        res.code = Ok
      }

      next()
    } catch (error) {
      console.error('err ==', error)
      res.code = BadRequest
      throw error
    }
  }
}
