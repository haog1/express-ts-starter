import { ServerError } from '../constants'
import { BaseError } from './BaseError'

interface ErrorAttribute {
  message: string
  field: string
}

export class MissingRequiredKeysError extends BaseError {
  status = ServerError

  constructor(public errors: ErrorAttribute[] = []) {
    super()
    Object.setPrototypeOf(this, MissingRequiredKeysError.prototype)
  }

  serializeErrors() {
    return this.errors.map(({ message, field }) => {
      return { message, field }
    })
  }
}
