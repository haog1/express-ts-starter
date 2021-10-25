import { Request, Response, NextFunction } from 'express'
import { IModel } from '../models/interfaces'
import { IRepository, IProductOptionsRepository, IProductsRepository } from '../repositories'

export interface IController {
  getRepository<T extends number, U extends string>(): IRepository
  setRepository<T extends number, U extends string>(repo: IRepository): void
  getAll(req: Request, res: Response, next: NextFunction): Promise<void | never>
  getOne(req: Request, res: Response, next: NextFunction): Promise<void | never>
  create(req: Request, res: Response, next: NextFunction): Promise<void | never>
  updateOne(req: Request, res: Response, next: NextFunction): Promise<void | never>
  delete(req: Request, res: Response, next: NextFunction): Promise<void | never>
}

export interface IProductOptionsController {
  getRepository<T extends number, U extends string>(): IProductOptionsRepository
  setRepository<T extends number, U extends string>(repo: IProductOptionsRepository): void
  getSecondRepisotry<T extends number, U extends string>(): IProductsRepository
  setSecondRepisotry<T extends number, U extends string>(repo: IProductsRepository): void
}
