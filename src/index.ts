import { Request, Response, NextFunction } from 'express'
import app from './app'
import { ServiceUnavailable } from './constants'
import { checkingRequiredEnvVariables } from './utils'

const port = process.env.APP_PORT

app.get('/healthcheck', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send({
      uptime: process.uptime(),
      timestamp: Date.now(),
    })
  } catch (e) {
    res.status(ServiceUnavailable).send()
  }
})

app.listen(port, async () => {
  checkingRequiredEnvVariables()

  console.log(`Listening on the port ${port}...`)
})
