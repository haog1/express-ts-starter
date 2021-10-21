import { DataTypes, Optional } from 'sequelize'
import { GUID } from '../types/guid'
import { initModelFields } from '../utils/init-model-fields'
import { sequelize } from '../utils/sequelize'
import { BaseModel } from './base'
import { IBaseModel } from './interfaces/ibase-model'

interface ProductOptionAttrs extends IBaseModel {
  name: string
  description: string
  productId: GUID
  isNew: boolean
}

interface ProductOptionCreationAttrs extends Optional<ProductOptionAttrs, 'id' | '_isDeleted'> {}

class ProductOptionModel
  extends BaseModel<ProductOptionAttrs, ProductOptionCreationAttrs>
  implements ProductOptionAttrs
{
  productId!: GUID
  public name!: string
  public description!: string
  public isNew!: boolean
}

ProductOptionModel.init(
  initModelFields({
    productId: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    isNew: {
      type: DataTypes.STRING,
    },
  }),
  {
    schema: 'public',
    tableName: 'product-options',
    sequelize,
  },
)

export { ProductOptionModel }
