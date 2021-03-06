import supertest from 'supertest'
import app from '../../app'
import { Ok } from '../../constants'
import { Product } from '../../models/product'

jest.mock('../../models/product')

describe('/products collection', () => {
  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500))
  })

  test('it can get list of products', async () => {
    Product.findAll = jest.fn().mockImplementation(() => {
      return [
        {
          Guid: '01234567-89ab-cdef-0123-456789abcdef',
          Name: 'Product name',
          Description: 'Product description',
          Price: 123.45,
          DeliveryPrice: 12.34,
        },
      ]
    })
    const response = await supertest(app).get('/api/products').send({}).expect(Ok)
    const { data, success } = response.body
    expect(Product.findAll).toHaveBeenCalled()
    expect(success).toBe(true)
    expect(data).toEqual({
      Items: [
        {
          Guid: '01234567-89ab-cdef-0123-456789abcdef',
          Name: 'Product name',
          Description: 'Product description',
          Price: 123.45,
          DeliveryPrice: 12.34,
        },
      ],
    })
  })
})
