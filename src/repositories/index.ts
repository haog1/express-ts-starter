export * from './interfaces'
export * from './products'
export * from './base'
import { ProductsRepository } from './products'

const productsRepository = new ProductsRepository()

export { productsRepository }
