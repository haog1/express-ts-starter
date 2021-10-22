import { DataTypes, Optional } from 'sequelize'
import { GUID } from '../types/guid'
import { initModelFields, sequelize } from '../utils'
import { BaseModel } from './base'
import { DefaultHiddenFields, IModel, IBaseReturnAttrs } from './contract'

interface ProductOptionAttrs extends IModel<GUID> {
  name: string
  description: string
  productId: GUID
  isNew: boolean
}

export interface ProductOptionCreationAttrs extends Optional<ProductOptionAttrs, DefaultHiddenFields> {}

export interface ProductReturnAttrs extends IBaseReturnAttrs<GUID> {
  name: string
  description: string
  productId: GUID
  isNew: boolean
}

class ProductOptionModel
  extends BaseModel<ProductOptionAttrs, ProductOptionCreationAttrs>
  implements ProductOptionAttrs
{
  public productId!: GUID
  public name!: string
  public description!: string
  public isNew!: boolean
}

ProductOptionModel.init(
  initModelFields({
    productId: {
      type: DataTypes.STRING,
      field: 'product_id',
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    isNew: {
      type: DataTypes.STRING,
      field: 'is_new',
    },
  }),
  {
    schema: 'public',
    tableName: 'product-options',
    sequelize,
  },
)

export { ProductOptionModel }
