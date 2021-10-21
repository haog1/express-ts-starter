import { BadRequest } from '../constants'
import { BaseError } from './BaseError'

export class BadRequestError extends BaseError {
  status = BadRequest
  constructor(message: string = 'The request cannot be processed') {
    super(message)
    this.message = message
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}
