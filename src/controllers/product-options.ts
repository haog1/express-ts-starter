import { Request, Response, NextFunction } from 'express'
import { BaseController } from './base'
import { BadRequest, Ok } from '../constants'
import { Product, ProductOptionCreationAttrs } from '../models'
import { GetProductOptionsParameters, CreateProductOptionParameters, RemoveProductOptionParameter } from '../parameters'
import { IProductOptionsRepository, IProductsRepository } from '../repositories'
import { mapData, logger } from '../utils'
import { NoRepositoryError, NotFoundError } from '../errors'
import { IProductOptionsController } from '.'

export class ProductOptionsController
  extends BaseController<IProductOptionsRepository>
  implements IProductOptionsController
{
  private _productRepo?: IProductsRepository
  constructor(repo?: IProductOptionsRepository) {
    super(repo)
  }
  getSecondRepisotry<T extends number, U extends string>(): IProductsRepository {
    if (!this._productRepo) {
      throw new NoRepositoryError('No second repository found: IProductsRepository')
    }
    return this._productRepo
  }
  setSecondRepisotry<T extends number, U extends string>(productRepo: IProductsRepository): void {
    this._productRepo = productRepo
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void | never> => {
    try {
      const repo = this.getRepository()
      const { limit, offset } = req.query as unknown as GetProductOptionsParameters
      res.data = {
        Items: await repo.getAll(req.params.id, limit, offset),
      }
      res.code = Ok
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
      const productRepo = this.getSecondRepisotry()

      const { id } = req.params

      if (!(await productRepo.getOne<Product>(id))) {
        throw new NotFoundError('Product Id is incorrect')
      }

      const createProductOptionParameters = mapData<ProductOptionCreationAttrs, CreateProductOptionParameters>({
        ...req.body,
        productId: id,
      })

      const Id = await repo.create(createProductOptionParameters)

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
      const updateproductParameters = mapData<ProductOptionCreationAttrs, CreateProductOptionParameters>(req.body)
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
      const { force } = req.query as unknown as RemoveProductOptionParameter
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
