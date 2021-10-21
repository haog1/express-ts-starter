import request from 'supertest'
import app from '../app'
import { Ok } from '@haog1/micro-core'

describe('Sample test', () => {
  it('returns sample data', async () => {
    const response = await request(app).get(`/api/${process.env.API_VERSION}/sample`).send().expect(Ok)
    const { data, success } = response.body
    expect(success).toBe(true)
    expect(data).toEqual({
      message: 'This is sample data',
    })
  })
})
