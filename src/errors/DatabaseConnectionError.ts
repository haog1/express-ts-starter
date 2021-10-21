import { ServerError } from '../constants'
import { BaseError } from './BaseError'

export class DatabaseConnectionError extends BaseError {
  status = ServerError

  constructor(message: string = 'Failed to connect to the database') {
    super(message)
    this.message = message
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}
