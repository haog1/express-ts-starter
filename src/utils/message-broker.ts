import { natsInstance } from '@haog1/micro-nats'
import { startListeners } from './event-listeners'

const onSuccess = () => {
  console.log('Connected to nats...')
}

const onFailure = (err: Error) => {
  throw err
}

export const startNats = async () => {
  try {
    await natsInstance.connect(
      process.env.NATS_CLUSTERID!,
      process.env.NATS_CLIENT_ID!,
      {
        url: process.env.NATS_HOST_URL!,
      },
      onSuccess,
      onFailure,
    )

    natsInstance.client.on('close', () => {
      console.log('NATS connection closed!')
      process.exit()
    })
    process.on('SIGINT', () => natsInstance.client.close())
    process.on('SIGTERM', () => natsInstance.client.close())

    startListeners()
  } catch (error) {
    throw error
  }
}
