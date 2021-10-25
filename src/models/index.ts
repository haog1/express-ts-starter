export * from './interfaces'
export * from './product'
export * from './product-option'

import { belongsTo, hasMany, Instance } from '../utils'
import { Product } from './product'
import { ProductOption } from './product-option'

// model relations
hasMany(Product as Instance, ProductOption as Instance, 'id', 'productId', { as: 'productOpts' })
belongsTo(ProductOption as Instance, Product as Instance, 'productId', 'id', { as: 'relatedProduct' })

export { Product, ProductOption }
