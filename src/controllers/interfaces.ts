import { Request, Response, NextFunction } from 'express'
import { IModel } from '../models/interfaces'
import { IRepository } from '../repositories/interfaces'

export interface IController {
  getRepository<T extends number, U extends string>(): IRepository<IModel<T, U>>
  setRepository<T extends number, U extends string>(repo: IRepository<IModel<T, U>>): void
  getAll(req: Request, res: Response, next: NextFunction): Promise<void | never>
  getOne(req: Request, res: Response, next: NextFunction): Promise<void | never>
  create(req: Request, res: Response, next: NextFunction): Promise<void | never>
  updateOne(req: Request, res: Response, next: NextFunction): Promise<void | never>
  delete(req: Request, res: Response, next: NextFunction): Promise<void | never>
}
