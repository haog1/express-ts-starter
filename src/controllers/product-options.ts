import { Request, Response, NextFunction } from 'express'
import { BaseController } from './base'
import { BadRequest, Ok } from '../constants'
import { Product, ProductOption, ProductOptionCreationAttrs } from '../models'
import { CreateProductOptionParameters, RemoveProductOptionParameter } from '../parameters'
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
      const { limit, offset } = req.query
      const size = limit ? +limit : 5
      const toSkip = offset ? +offset : 0
      res.data = {
        Items: await repo.getAll(req.params.id, size, toSkip),
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
      const productRepo = this.getSecondRepisotry()
      const product = await productRepo.getOne(req.params.id)
      if (!product) {
        throw new NotFoundError('Product has not been not found')
      }
      if (!(await repo.getOne<ProductOption>(req.params.optionId, req.params.id))) {
        throw new NotFoundError('Product option requeseted does not exist')
      }
      const productOption = await repo.getOne(req.params.optionId, req.params.id)
      res.data = productOption
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
      const productRepo = this.getSecondRepisotry()
      const product = await productRepo.getOne(req.params.id)
      if (!product) {
        throw new NotFoundError('Product has not been not found')
      }
      if (!(await repo.getOne<ProductOption>(req.params.optionId, req.params.id))) {
        throw new NotFoundError('Product option requeseted does not exist')
      }
      const updateData = mapData<ProductOptionCreationAttrs, CreateProductOptionParameters>(req.body)
      const { Id, Guid, IsDeleted, ProductId, ...updateproductOptionParameters } = updateData
      const id = await repo.updateOne(req.params.optionId, updateproductOptionParameters)
      res.data = { Id: id }
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
      const productRepo = this.getSecondRepisotry()
      const product = await productRepo.getOne(req.params.id)
      if (!product) {
        throw new NotFoundError('Product has not been not found or has already been deleted')
      }
      if (!(await repo.getOne<ProductOption>(req.params.optionId, req.params.id))) {
        throw new NotFoundError('Product option requeseted does not exist or has been deleted')
      }
      const { force } = req.query as unknown as RemoveProductOptionParameter
      res.data = await repo.delete(req.params.optionId, req.params.id, force)
      res.code = Ok
      next()
    } catch (error) {
      logger(error)
      res.code = BadRequest
      throw error
    }
  }
}
