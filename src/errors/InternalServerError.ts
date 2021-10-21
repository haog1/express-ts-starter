import { ServerError } from '../constants'
import { BaseError } from './BaseError'

export class InternalServerError extends BaseError {
  status = ServerError

  constructor(message: string = 'Server is catchping up...') {
    super(message)
    this.message = message
    Object.setPrototypeOf(this, InternalServerError.prototype)
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}
