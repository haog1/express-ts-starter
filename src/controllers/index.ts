export * from './interfaces'
export * from './base'
import { ProductsController } from './products'

const productsController = new ProductsController()

export { productsController }
