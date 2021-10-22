import { Request, Response, NextFunction } from 'express'
import { NoRepositoryError } from '../errors'
import { IBaseModel } from '../models/contract'
import { IRepository } from '../repositories/contract'
import { GUID } from '../types/guid'
import { IBaseController } from './contract'

export abstract class BaseController implements IBaseController {
  protected _repository: IRepository<IBaseModel<GUID>>

  public get repository() {
    if (!this._repository) {
      throw new NoRepositoryError()
    }
    return this._repository
  }

  constructor(repo: IRepository<IBaseModel<GUID>>) {
    if (!repo) {
      throw new NoRepositoryError()
    }
    this._repository = repo
  }

  public abstract getAll(req: Request, res: Response, next: NextFunction): Promise<void | never>
}
