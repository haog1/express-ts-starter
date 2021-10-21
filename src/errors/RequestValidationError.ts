import { ValidationError } from 'express-validator'
import { BadRequest } from '../constants'
import { BaseError } from './BaseError'

export class RequestValidationError extends BaseError {
  status = BadRequest
  constructor(public errors: ValidationError[], public message: string = 'Incorrect request data') {
    super(message)
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors() {
    return this.errors.map(err => {
      return { message: err.msg, field: err.param }
    })
  }
}
