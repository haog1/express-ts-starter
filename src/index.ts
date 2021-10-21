import app from './app'
import { checkingRequiredEnvVariables } from './utils/env-check'
import { initModelFields } from './utils/init-model-fields'

const port = process.env.APP_PORT

app.listen(port, async () => {
  checkingRequiredEnvVariables()

  // await startNats() // start database connection
  // await startDb() // start database connection

  console.log(`Listening on the port ${port}...`)
})
