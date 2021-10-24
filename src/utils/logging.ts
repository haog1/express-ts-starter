export const logger = (...args: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    const consoleLogColor = '\x1b[36m%s\x1b[0m'
    console.error(`${consoleLogColor}`, '### LOGGING ###: ' + '\x1b[31m', args)
  }
}
