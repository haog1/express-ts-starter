import { DataTypes, Optional } from 'sequelize'
import { sequelize } from '../utils/sequelize'
import { BaseModel } from './base'
import { IBaseModel } from './interfaces/ibase-model'

interface ProductAttrs extends IBaseModel {
  name: string
  description: string
  price: number
  deliveryPrice: number
  isNew: boolean
}

interface ProductCreationAttrs extends Optional<ProductAttrs, 'id' | '_isDeleted'> {}

class ProductModel extends BaseModel<ProductAttrs, ProductCreationAttrs> implements ProductAttrs {
  public name!: string
  public description!: string
  public price!: number
  public deliveryPrice!: number
  public isNew!: boolean
}

ProductModel.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    guid: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.STRING,
    },
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
    _isDeleted: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    schema: 'public',
    tableName: 'products',
    sequelize,
  },
)

export { ProductModel }
