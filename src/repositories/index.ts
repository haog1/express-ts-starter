export * from './interfaces'
export * from './products'
export * from './base'
import { ProductOptionOptionsRepository } from './product-options'
import { ProductsRepository } from './products'

const productsRepository = new ProductsRepository()
const productOptionsRepository = new ProductOptionOptionsRepository()

export { productsRepository, productOptionsRepository }
