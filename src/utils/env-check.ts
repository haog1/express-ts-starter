import { MissingRequiredKeysError } from '@haog1/micro-core'

export const checkingRequiredEnvVariables = () => {
  const envs = [
    {
      key: 'API_VERSION',
      value: process.env.API_VERSION,
    },
    {
      key: 'APP_PORT',
      value: process.env.APP_PORT,
    },
    {
      key: 'NATS_CLUSTERID',
      value: process.env.NATS_CLUSTERID,
    },
    {
      key: 'NATS_CLIENT_ID',
      value: process.env.NATS_CLIENT_ID,
    },
    {
      key: 'NATS_HOST_URL',
      value: process.env.NATS_HOST_URL,
    },
    {
      key: 'DB_STRING',
      value: process.env.DB_STRING,
    },
    {
      key: 'JWT_KEY',
      value: process.env.JWT_KEY,
    },
  ]
  let hasError = false
  envs.forEach(({ key, value }) => {
    if (!value) {
      hasError = true
      console.error('\x1b[36m%s\x1b[0m', 'Missing required key: ' + '\x1b[31m' + key)
    }
  })
  if (hasError) {
    process.abort()
  }
}
