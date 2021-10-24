import { Op } from 'sequelize'
import { ProductAttrs, ProductCreationAttrs, ProductModel } from '../models/product'
import { GUID } from '../types/guid'
import { sequelize, generateId } from '../utils'
import { BaseRepository } from './base'

export class ProductsRepository extends BaseRepository {
  async getAllByName<ProductModel>(offset: number = 0, limit: number = 5, name: string): Promise<ProductModel[]> {
    const products = await ProductModel.findAll({
      attributes: {
        exclude: ['Id', 'IsDeleted'],
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
        exclude: ['Id', 'IsDeleted'],
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

  async getOne<ProductModel>(guid: GUID): Promise<ProductModel | null> {
    return (await ProductModel.findOne({
      attributes: {
        exclude: ['Id', 'IsDeleted'],
      },
      where: {
        Guid: guid,
        IsDeleted: false,
      },
      raw: true,
    })) as Partial<ProductAttrs> as ProductModel
  }

  async create(entity: ProductCreationAttrs): Promise<GUID | null> {
    const transaction = await sequelize.transaction()
    try {
      const Guid = generateId()
      await ProductModel.create(
        {
          Guid,
          IsDeleted: false,
          ...entity,
        },
        { transaction },
      )
      await transaction.commit()
      return Guid
    } catch (error) {
      await transaction.rollback()
      return null
    }
  }
}
