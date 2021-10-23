beforeAll(async () => {
  process.env.APP_PORT = '5001'
  process.env.DB_NAME = 'postgres'
  process.env.DB_USER = 'postgres'
  process.env.DB_PASSWORD = 'postgres'
  process.env.DB_HOST = 'localhost'
  process.env.DB_PORT = '5432'
})

beforeEach(async () => {
  // do something
})

afterAll(async () => {
  // do something
})
