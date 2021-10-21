import { Unauthorized } from '../constants'
import { BaseError } from './BaseError'

export class UnauthorizedError extends BaseError {
  status = Unauthorized

  constructor(message: string = 'Unauthorized') {
    super(message)
    this.message = message
    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}
