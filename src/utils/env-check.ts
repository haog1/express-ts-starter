export const checkingRequiredEnvVariables = () => {
  const envs = [
    {
      key: 'DB_HOST',
      value: process.env.DB_HOST,
    },
    {
      key: 'DB_PORT',
      value: process.env.DB_PORT,
    },
    {
      key: 'DB_NAME',
      value: process.env.DB_NAME,
    },
    {
      key: 'DB_USER',
      value: process.env.DB_USER,
    },
    {
      key: 'DB_PASSWORD',
      value: process.env.DB_PASSWORD,
    },
  ]
  let hasError = false
  envs.forEach(({ key, value }) => {
    if (!value) {
      hasError = true
      const errorColor = '\x1b[36m%s\x1b[0m'
      console.error(`${errorColor}`, 'Missing required key: ' + '\x1b[31m' + key)
    }
  })
  if (hasError) {
    process.abort()
  }
}
