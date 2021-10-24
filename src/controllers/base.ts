import { Request, Response, NextFunction } from 'express'
import { NoRepositoryError } from '../errors'
import { IRepository } from '../repositories'
import { IController } from '.'

export abstract class BaseController<T extends IRepository> implements IController {
  protected _repository?: T

  constructor(repo?: T) {
    if (repo) {
      this._repository = repo
    }
  }

  getRepository(): T {
    if (!this._repository) {
      throw new NoRepositoryError()
    }
    return this._repository
  }

  public setRepository(repo: T): void {
    this._repository = repo
  }

  public abstract getAll(req: Request, res: Response, next: NextFunction): Promise<void | never>
  public abstract getOne(req: Request, res: Response, next: NextFunction): Promise<void | never>
  public abstract create(req: Request, res: Response, next: NextFunction): Promise<void | never>
  public abstract updateOne(req: Request, res: Response, next: NextFunction): Promise<void | never>
  public abstract delete(req: Request, res: Response, next: NextFunction): Promise<void | never>
}
