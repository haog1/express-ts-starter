import { Op } from 'sequelize'
import { ProductAttrs, ProductCreationAttrs, ProductModel } from '../models/product'
import { GUID } from '../types/guid'
import { sequelize, generateId } from '../utils'
import { BaseRepository } from './base'

export class ProductsRepository extends BaseRepository {
  async getAllByName<ProductModel>(offset: number = 0, limit: number = 5, name: string): Promise<ProductModel[]> {
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

  async getAll<ProductModel>(offset: number = 0, limit: number = 5): Promise<ProductModel[]> {
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

  async getOne<ProductModel>(id: GUID): Promise<ProductModel | null> {
    return (await ProductModel.findByPk(id)) as Partial<ProductAttrs> as ProductModel
  }

  async create(entity: ProductCreationAttrs): Promise<GUID | null> {
    const transaction = await sequelize.transaction()
    try {
      const Id = generateId()
      await ProductModel.create({
        Id,
        IsDeleted: false,
        ...entity,
      })
      await transaction.commit()
      return Id
    } catch (error) {
      await transaction.rollback()
      return null
    }
  }
}
