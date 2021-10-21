import { Publisher, Subjects } from '@haog1/micro-nats'

interface SampleEvent {
  subject: Subjects.TicketCreated
  data: {
    id: string
  }
}

export class SampleEventPublisher extends Publisher<SampleEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated
}
