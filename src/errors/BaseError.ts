export abstract class BaseError extends Error {
  abstract status: number

  constructor(message: string = 'Unknown Error') {
    super(message)
    Object.setPrototypeOf(this, BaseError.prototype)
  }

  abstract serializeErrors(): {
    message: string
    field?: string
  }[]
}
