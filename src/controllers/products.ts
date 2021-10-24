import { Request, Response, NextFunction } from 'express'
import { BaseController } from './base'
import { BadRequest, Ok } from '../constants'
import { IModel, ProductCreationAttrs } from '../models'
import {
  GetProductsParameters,
  CreateProductParameters,
  GetProductByIdParameter,
  RemoveProductParameter,
} from '../parameters/products'
import { IRepository } from '../repositories/contract'
import { GUID } from '../types/guid'
import { mapData, logger } from '../utils'
import { NotFoundError } from '../errors'

export class ProductsController extends BaseController {
  constructor(repo?: IRepository<IModel<number, GUID>>) {
    super(repo)
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void | never> => {
    try {
      const repo = this.getRepository()
      const { name, limit, offset } = req.query as unknown as GetProductsParameters
      if (name) {
        res.data = {
          Items: await repo.getAllByName(limit, offset, name),
        }
        res.code = Ok
      } else {
        res.data = {
          Items: await repo.getAll(limit, offset),
        }
        res.code = Ok
      }

      next()
    } catch (error) {
      logger(error)
      res.code = BadRequest
      throw error
    }
  }

  getOne = async (req: Request, res: Response, next: NextFunction): Promise<void | never> => {
    try {
      const repo = this.getRepository()
      const { guid } = req.params as unknown as GetProductByIdParameter
      const product = await repo.getOne(guid)
      if (!product) {
        throw new NotFoundError('Product has not been not found')
      }
      res.data = product
      res.code = Ok
      next()
    } catch (error) {
      logger(error)
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
      logger(error)
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
      logger(error)
      res.code = BadRequest
      throw error
    }
  }
}
