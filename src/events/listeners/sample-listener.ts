import { Message } from 'node-nats-streaming'
import { Listener, Subjects } from '@haog1/micro-nats'
import { queueGroupName } from './queue-group-name'

interface SampleEvent {
  subject: Subjects.TicketCreated
  data: {
    id: string
  }
}

export class SampleEventListener extends Listener<SampleEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated
  queueGroupName = queueGroupName

  async onMessage(data: SampleEvent['data'], msg: Message) {
    // do something
    msg.ack()
  }
}
