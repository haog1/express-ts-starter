import { Request, Response, NextFunction } from 'express'
import { BaseController } from './base'
import { BadRequest, Ok } from '../constants'
import { ProductCreationAttrs } from '../models'
import { CreateProductParameters, RemoveProductParameter } from '../parameters'
import { IProductsRepository } from '../repositories'
import { mapData, logger } from '../utils'
import { NotFoundError } from '../errors'

export class ProductsController extends BaseController<IProductsRepository> {
  constructor(repo?: IProductsRepository) {
    super(repo)
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void | never> => {
    try {
      const repo = this.getRepository()
      const { name, limit, offset } = req.query
      const size = limit ? +limit : 5
      const toSkip = offset ? +offset : 0
      if (name) {
        res.data = {
          Items: await repo.getAllByName(size, toSkip, name.toString()),
        }
        res.code = Ok
      } else {
        res.data = {
          Items: await repo.getAll(size, toSkip),
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
      const product = await repo.getOne(req.params.id)
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

  updateOne = async (req: Request, res: Response, next: NextFunction): Promise<void | never> => {
    try {
      const repo = this.getRepository()
      const product = await repo.getOne(req.params.id)
      if (!product) {
        throw new NotFoundError('Product has not been not found')
      }
      const updateproductParameters = mapData<ProductCreationAttrs, CreateProductParameters>(req.body)
      const Id = await repo.updateOne(req.params.id, updateproductParameters)
      res.data = { Id }
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
      const product = await repo.getOne(req.params.id)
      if (!product) {
        throw new NotFoundError('Product has not been not found or has already been deleted')
      }
      const { force } = req.query as unknown as RemoveProductParameter
      res.data = await repo.delete(req.params.id, force)
      res.code = Ok
      next()
    } catch (error) {
      logger(error)
      res.code = BadRequest
      throw error
    }
  }
}
