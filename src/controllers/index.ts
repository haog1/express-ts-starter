export * from './interfaces'
export * from './base'
import { ProductOptionsController } from './product-options'
import { ProductsController } from './products'

const productsController = new ProductsController()
const productOptionsContoller = new ProductOptionsController()

export { productsController, productOptionsContoller }
