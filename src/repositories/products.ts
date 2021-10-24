import { Op } from 'sequelize'
import { ProductAttrs, ProductModel } from '../models/product'
import { GUID } from '../types/guid'
import { BaseRepository } from './base'

export class ProductsRepository extends BaseRepository {
  public async getAllByName<ProductModel>(
    offset: number = 0,
    limit: number = 5,
    name: string,
  ): Promise<ProductModel[]> {
    const products = await ProductModel.findAll({
      attributes: {
        exclude: ['IsDeleted'],
      },
      where: {
        IsDeleted: false,
        Name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit,
      offset,
      raw: true,
    })

    return products.map((product: Partial<ProductAttrs>) => product as ProductModel)
  }

  public async getAll<ProductModel>(offset: number = 0, limit: number = 5): Promise<ProductModel[]> {
    const products = await ProductModel.findAll({
      attributes: {
        exclude: ['IsDeleted'],
      },
      where: {
        IsDeleted: false,
      },
      limit,
      offset,
      raw: true,
    })
    return products.map((product: Partial<ProductAttrs>) => product as ProductModel)
  }

  public async getOne<ProductModel>(id: GUID): Promise<ProductModel | null> {
    return (await ProductModel.findByPk(id)) as Partial<ProductAttrs> as ProductModel
  }
}
