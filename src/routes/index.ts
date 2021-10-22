import express from 'express'
import { injectRepository } from '../utils'
import { productsController as controller } from '../controllers'
import { productRepository as repository } from '../repositories'
import products from './products'

const rootRoute = express.Router()

rootRoute.use('/products', injectRepository(controller, repository), products)

export default rootRoute
