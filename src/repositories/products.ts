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
      order: [['id', 'desc']],
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
      order: [['id', 'desc']],
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
          ...entity,
          Guid,
          IsDeleted: false,
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

  async delete(guid: string, force?: boolean): Promise<boolean> {
    const product = await this.getOne(guid)
    if (!product) return false
    const transaction = await sequelize.transaction()

    try {
      let res
      if (force) {
        res = await ProductModel.destroy({
          where: {
            Guid: guid,
          },
          transaction,
        })
      } else {
        res = await ProductModel.update(
          {
            IsDeleted: true,
          },
          {
            where: {
              Guid: guid,
              IsDeleted: false,
            },
            transaction,
          },
        )
      }

      if (!res) return false
      if (typeof res === 'object' && !res[0]) return false
      await transaction.commit()
      return true
    } catch (error) {
      await transaction.rollback()
      return false
    }
  }
}
