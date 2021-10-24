import { DataTypes, Optional } from 'sequelize'
import { GUID } from '../types/guid'
import { initModelFields, sequelize } from '../utils'
import { BaseModel } from './base'
import { DefaultHiddenFields, IModel } from './contract'

export interface ProductAttrs extends IModel<number, GUID> {
  Name: string
  Description: string
  Price: number
  DeliveryPrice: number
  IsNew: boolean
}

export interface ProductCreationAttrs extends Optional<ProductAttrs, DefaultHiddenFields> {}

class ProductModel extends BaseModel<ProductAttrs, ProductCreationAttrs> implements ProductAttrs {
  public Name!: string
  public Description!: string
  public Price!: number
  public DeliveryPrice!: number
  public IsNew!: boolean
}

ProductModel.init(
  initModelFields({
    Name: {
      type: DataTypes.STRING,
      field: 'name',
    },
    Description: {
      type: DataTypes.STRING,
      field: 'description',
    },
    Price: {
      type: DataTypes.NUMBER,
      field: 'price',
    },
    DeliveryPrice: {
      type: DataTypes.NUMBER,
      field: 'delivery_price',
    },
    IsNew: {
      type: DataTypes.STRING,
      field: 'is_new',
    },
  }),
  {
    schema: 'public',
    tableName: 'products',
    sequelize,
  },
)

export { ProductModel }
