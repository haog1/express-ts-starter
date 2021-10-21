import app from './app'
import { checkingRequiredEnvVariables } from './utils/env-check'

const port = process.env.APP_PORT

app.listen(port, async () => {
  checkingRequiredEnvVariables()

  console.log(`Listening on the port ${port}...`)
})
