import { Request, Response, NextFunction } from 'express'
import { IBaseController } from './contract'

export abstract class BaseController implements IBaseController {
  public abstract getAll(req: Request, res: Response, next: NextFunction): Promise<void | never>
}
