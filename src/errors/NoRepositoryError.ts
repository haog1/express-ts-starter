import { BadRequest } from '../constants'
import { BaseError } from './BaseError'

export class NoRepositoryError extends BaseError {
  status = BadRequest
  constructor(message: string = 'No repository is provided') {
    super(message)
    this.message = message
    Object.setPrototypeOf(this, NoRepositoryError.prototype)
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}
