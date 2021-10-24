import { Request, Response, NextFunction } from 'express'
import { IModel } from '../models/contract'
import { IRepository } from '../repositories/contract'

interface IController {
  getRepository<T>(): IRepository<IModel<T>>
  setRepository<T>(repo: IRepository<IModel<T>>): void
  getAll(req: Request, res: Response, next: NextFunction): Promise<void | never>
  getOne(req: Request, res: Response, next: NextFunction): Promise<void | never>
  create(req: Request, res: Response, next: NextFunction): Promise<void | never>
  delete(req: Request, res: Response, next: NextFunction): Promise<void | never>
}
