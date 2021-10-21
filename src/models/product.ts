import { DataTypes, Optional } from 'sequelize'
import { initModelFields, sequelize } from '../utils'
import { BaseModel } from './base'
import { DefaultHiddenFields, IBaseModel } from './def'

interface ProductAttrs extends IBaseModel {
  name: string
  description: string
  price: number
  deliveryPrice: number
  isNew: boolean
}

interface ProductCreationAttrs extends Optional<ProductAttrs, DefaultHiddenFields> {}

class ProductModel extends BaseModel<ProductAttrs, ProductCreationAttrs> implements ProductAttrs {
  public name!: string
  public description!: string
  public price!: number
  public deliveryPrice!: number
  public isNew!: boolean
}

ProductModel.init(
  initModelFields({
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
    deliveryPrice: {
      type: DataTypes.STRING,
    },
    isNew: {
      type: DataTypes.STRING,
    },
  }),
  {
    schema: 'public',
    tableName: 'products',
    sequelize,
  },
)

export { ProductModel }
