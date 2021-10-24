import { DataTypes, Optional } from 'sequelize'
import { GUID } from '../types/guid'
import { initModelFields, sequelize } from '../utils'
import { BaseModel } from './base'
import { DefaultHiddenFields, IModel } from '.'

interface ProductOptionAttrs extends IModel<number, GUID> {
  Name: string
  Description: string
  ProductId: GUID
}

export interface ProductOptionCreationAttrs extends Optional<ProductOptionAttrs, DefaultHiddenFields> {}

class ProductOptionModel
  extends BaseModel<ProductOptionAttrs, ProductOptionCreationAttrs>
  implements ProductOptionAttrs
{
  public ProductId!: GUID
  public Name!: string
  public Description!: string
}

ProductOptionModel.init(
  initModelFields({
    ProductId: {
      type: DataTypes.STRING,
      field: 'product_id',
    },
    Name: {
      type: DataTypes.STRING,
      field: 'name',
    },
    Description: {
      type: DataTypes.STRING,
      field: 'description',
    },
  }),
  {
    schema: 'public',
    tableName: 'product-options',
    sequelize,
  },
)

export { ProductOptionModel }
