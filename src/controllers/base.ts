import { Request, Response, NextFunction } from 'express'
import { NoRepositoryError } from '../errors'
import { IModel } from '../models'
import { IRepository } from '../repositories'
import { GUID } from '../types/guid'
import { IController } from '.'

export abstract class BaseController implements IController {
  protected _repository?: IRepository

  constructor(repo?: IRepository) {
    if (repo) {
      this._repository = repo
    }
  }

  getRepository(): IRepository {
    if (!this._repository) {
      throw new NoRepositoryError()
    }
    return this._repository
  }

  public setRepository(repo: IRepository): void {
    this._repository = repo
  }

  public abstract getAll(req: Request, res: Response, next: NextFunction): Promise<void | never>
  public abstract getOne(req: Request, res: Response, next: NextFunction): Promise<void | never>
  public abstract create(req: Request, res: Response, next: NextFunction): Promise<void | never>
  public abstract updateOne(req: Request, res: Response, next: NextFunction): Promise<void | never>
  public abstract delete(req: Request, res: Response, next: NextFunction): Promise<void | never>
}
