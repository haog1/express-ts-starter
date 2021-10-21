import { natsInstance } from '@haog1/micro-nats'
import { SampleEventListener } from '../events'

export const startListeners = () => {
  new SampleEventListener(natsInstance.getClient()).listen()
}
