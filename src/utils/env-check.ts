export const checkingRequiredEnvVariables = () => {
  const envs = [
    {
      key: 'APP_PORT',
      value: process.env.APP_PORT,
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
