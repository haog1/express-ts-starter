import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { signToken } from '@haog1/micro-core'

interface TestUser {
  name: string
  email: string
  password: string
  id: string
}

declare global {
  var signin: (user?: TestUser) => string[]
}

let mongo: any

beforeAll(async () => {
  process.env.APP_PORT = '7003'
  process.env.API_VERSION = 'v1'
  process.env.JWT_KEY = 'Fj3UuSMhvAEQJFacPeIV'
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  process.env.COOKIE_SESSION_NAME = 'token'
  process.env.NATS_CLUSTERID = 'localNats'
  process.env.NATS_CLIENT_ID = 'localSampleServer'
  process.env.NATS_HOST_URL = 'demo.nats.io:4222'

  mongo = await MongoMemoryServer.create()

  const mongoUri = mongo.getUri()

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()
  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

global.signin = user => {
  let testUser: TestUser
  if (!user) {
    testUser = {
      email: 'testuser1@test.user',
      name: 'test User',
      password: 'testuser1',
      id: new mongoose.Types.ObjectId().toHexString(),
    }
  } else {
    testUser = user
  }
  return [
    `express:sess=${Buffer.from(
      JSON.stringify({
        jwt: signToken(testUser),
      }),
    ).toString('base64')}`,
  ]
}
