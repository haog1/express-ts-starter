import { DataTypes, Optional } from 'sequelize'
import { GUID } from '../types/guid'
import { initModelFields, sequelize } from '../utils'
import { BaseModel } from './base'
import { DefaultHiddenFields, IBaseModel, IBaseReturnAttrs } from './contract'

export interface ProductAttrs extends IBaseModel<GUID> {
  name: string
  description: string
  price: number
  deliveryPrice: number
  isNew: boolean
}

export interface ProductCreationAttrs extends Optional<ProductAttrs, DefaultHiddenFields> {}

export interface ProductReturnAttrs extends IBaseReturnAttrs<GUID> {
  Name?: string
  Description?: string
  Price?: number
  DeliveryPrice?: number
}

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
      type: DataTypes.NUMBER,
    },
    deliveryPrice: {
      type: DataTypes.NUMBER,
      field: 'delivery_price',
    },
    isNew: {
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
