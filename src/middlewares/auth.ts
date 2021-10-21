import { Request, Response, NextFunction } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'
import { UnauthorizedError } from '../errors/UnauthorizedError'
import { UserPayload } from '../types/express'

const verifyToken = (token: string): UserPayload => {
  return {
    id: 'some id',
    email: 'someemail@email.example',
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.token && req.headers!.cookie) {
    const token = req.headers!.cookie.split(`${process.env.COOKIE_SESSION_NAME! || 'express:sess'}=`)[1]
    const payload = JSON.parse(Buffer.from(token, 'base64').toString('utf8'))
    req.session = {
      token: payload.jwt,
    }
  }

  if (!req.session?.token) {
    throw new UnauthorizedError()
  }
  try {
    const user = verifyToken(req.session?.token)
    req.currentUser = user
    next()
  } catch (err: any) {
    throw new JsonWebTokenError((err as UnauthorizedError).message)
  }
}
