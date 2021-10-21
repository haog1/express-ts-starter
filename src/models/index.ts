import { belongsTo, hasMany, Instance } from '../utils'
import { ProductModel } from './product'
import { ProductOptionModel } from './product-option'

// model relations
hasMany(ProductModel as Instance, ProductOptionModel as Instance, 'id', 'productId', { as: 'productOpts' })
belongsTo(ProductOptionModel as Instance, ProductModel as Instance, 'productId', 'id', { as: 'relatedProduct' })

export { ProductModel, ProductOptionModel }
