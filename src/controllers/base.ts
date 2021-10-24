import { Request, Response, NextFunction } from 'express'
import { NoRepositoryError } from '../errors'
import { IModel } from '../models/contract'
import { IRepository } from '../repositories/contract'
import { GUID } from '../types/guid'
import { IController } from './contract'

export abstract class BaseController implements IController {
  protected _repository?: IRepository<IModel<number, GUID>>

  constructor(repo?: IRepository<IModel<number, GUID>>) {
    if (repo) {
      this._repository = repo
    }
  }

  getRepository(): IRepository<IModel<number, GUID>> {
    if (!this._repository) {
      throw new NoRepositoryError()
    }
    return this._repository
  }

  public setRepository(repo: IRepository<IModel<number, GUID>>): void {
    this._repository = repo
  }

  public abstract getAll(req: Request, res: Response, next: NextFunction): Promise<void | never>
  public abstract getOne(req: Request, res: Response, next: NextFunction): Promise<void | never>
  public abstract create(req: Request, res: Response, next: NextFunction): Promise<void | never>
}
