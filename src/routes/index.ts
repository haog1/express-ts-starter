import express from 'express'
import productOptions from './product-options'
import products from './products'

const rootRoute = express.Router()

rootRoute.use('/products', products)
rootRoute.use('/products/:guid/options', productOptions)

export default rootRoute
