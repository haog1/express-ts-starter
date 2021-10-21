import { NotFound } from '../constants'
import { BaseError } from './BaseError'

export class NotFoundError extends BaseError {
  status = NotFound

  constructor(message: string = 'Requested resources are not found') {
    super(message)
    this.message = message
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}
