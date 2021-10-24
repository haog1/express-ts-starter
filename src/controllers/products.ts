import { Request, Response, NextFunction } from 'express'
import { BaseController } from './base'
import { BadRequest, Ok } from '../constants'
import { IModel } from '../models/contract'
import {
  GetProductsParameters,
  CreateProductParameters,
  GetProductByIdParameter,
  RemoveProductParameter,
} from '../parameters/products'
import { IRepository } from '../repositories/contract'
import { GUID } from '../types/guid'
import { ProductCreationAttrs } from '../models/product'
import { mapData } from '../utils'

export class ProductsController extends BaseController {
  constructor(repo?: IRepository<IModel<number, GUID>>) {
    super(repo)
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void | never> => {
    try {
      const repo = this.getRepository()
      const { name, limit, offset } = req.query as unknown as GetProductsParameters
      if (name) {
        res.data = await repo.getAllByName(limit, offset, name)
        res.code = Ok
      } else {
        res.data = await repo.getAll(limit, offset)
        res.code = Ok
      }

      next()
    } catch (error) {
      console.error('err ==', error)
      res.code = BadRequest
      throw error
    }
  }

  getOne = async (req: Request, res: Response, next: NextFunction): Promise<void | never> => {
    try {
      const repo = this.getRepository()
      const { guid } = req.params as unknown as GetProductByIdParameter
      res.data = await repo.getOne(guid)
      res.code = Ok
      next()
    } catch (error) {
      console.error('err ==', error)
      res.code = BadRequest
      throw error
    }
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void | never> => {
    try {
      const repo = this.getRepository()
      const createProductParameters = mapData<ProductCreationAttrs, CreateProductParameters>(req.body)
      const Id = await repo.create(createProductParameters)
      res.data = {
        Id,
      }
      res.code = Ok
      next()
    } catch (error) {
      console.error('err ==', error)
      res.code = BadRequest
      throw error
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void | never> => {
    try {
      const repo = this.getRepository()
      const { guid } = req.params as unknown as GetProductByIdParameter
      const { force } = req.query as unknown as RemoveProductParameter
      res.data = await repo.delete(guid, force)
      res.code = Ok
      next()
    } catch (error) {
      console.error('err ==', error)
      res.code = BadRequest
      throw error
    }
  }
}
