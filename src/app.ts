import dotenv from 'dotenv'
import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'

import routes from './routes'

import { preRoute, postRoute } from './middlewares'

dotenv.config()

if (!process.env.APP_PORT) {
  throw Error('APP Port is not defined')
}

if (!process.env.API_VERSION) {
  throw Error('API Version is not defined')
}

const app = express()

app.use(
  cors({
    origin: process.env.SUPPORTED_ORIGINS?.split(';'),
    credentials: true,
  }),
)

app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    ...(process.env.COOKIE_SESSION_NAME! ? { name: process.env.COOKIE_SESSION_NAME } : {}),
    signed: false,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }),
)

app.use(`/api/${process.env.API_VERSION}`, preRoute, routes, postRoute)

export default app
