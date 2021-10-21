import { Request, Response, NextFunction } from 'express'

interface IBaseController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<void | never>
}
