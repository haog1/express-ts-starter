import { Request, Response, NextFunction } from 'express'
import { BaseController } from '.'
import { BadRequest } from '../constants'
import { NoRepositoryError } from '../errors'
import { IBaseRepository } from '../repositories/contract'

export class ProductsController extends BaseController {
  private readonly _repository: IBaseRepository

  public get repository() {
    return this._repository
  }

  constructor(repo: IBaseRepository) {
    super()
    if (!repo) {
      throw new NoRepositoryError()
    }
    this._repository = repo
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void | never> {
    try {
      res.data = await this.repository.getAll<number>()
      next()
    } catch (error) {
      res.code = BadRequest
      throw error
    }
  }
}
