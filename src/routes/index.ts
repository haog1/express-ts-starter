import express from 'express'
import products from './products'

const rootRoute = express.Router()

rootRoute.use('/products', products)

export default rootRoute
