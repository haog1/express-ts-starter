import { NextFunction, Request, Response, RequestHandler } from 'express'
import { checkSchema, Schema, validationResult } from 'express-validator'
import { RequestValidationError } from '../errors'

export type SchemaValidationResult = [RequestHandler, (req: Request, res: Response, next: NextFunction) => void]

export const validateRequest = (schema: Schema = {}): SchemaValidationResult => {
  return [
    checkSchema(schema) as unknown as RequestHandler,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
      }
      next()
    },
  ]
}
