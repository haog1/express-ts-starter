export * from './products'
export * from './base'
import { ProductsRepository } from './products'

const productRepository = new ProductsRepository()

export { productRepository }
