export interface UserPayload {
  id: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      foundRoute: Boolean | null
      currentUser?: UserPayload | null
    }
    interface Response {
      code?: number
      data?: any
    }
  }
}
