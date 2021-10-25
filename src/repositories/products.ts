import { Model, Op, Optional } from 'sequelize'
import { IProductsRepository } from '.'
import { DefaultHiddenFields } from '../models'
import { ProductAttrs, Product } from '../models/product'
import { GUID } from '../types/guid'
import { sequelize, generateId } from '../utils'
import { BaseRepository } from './base'

export class ProductsRepository extends BaseRepository implements IProductsRepository {
  async getAllByName<Product>(offset: number, limit: number, name: string): Promise<Product[]> {
    const products = await Product.findAll({
      attributes: {
        include: [['guid', 'Id']],
        exclude: ['Id', 'Guid', 'IsDeleted'],
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

    return products.map((product: Partial<ProductAttrs>) => product as Product)
  }

  // Override default function
  async getAll<Product>(offset: number = 0, limit: number = 5): Promise<Product[]> {
    const products = await Product.findAll({
      attributes: {
        include: [['guid', 'Id']],
        exclude: ['Id', 'Guid', 'IsDeleted'],
      },
      where: {
        IsDeleted: false,
      },
      limit,
      offset,
      order: [['id', 'desc']],
      raw: true,
    })
    return products.map((product: Partial<ProductAttrs>) => product as Product)
  }

  async getOne<Product>(guid: GUID): Promise<Product | null> {
    return (await Product.findOne({
      attributes: {
        include: [['guid', 'Id']],
        exclude: ['Id', 'Guid', 'IsDeleted'],
      },
      where: {
        Guid: guid,
        IsDeleted: false,
      },
      raw: true,
    })) as Partial<ProductAttrs> as Product
  }

  async create<ProductCreationAttrs>(entity: ProductCreationAttrs): Promise<GUID | null> {
    const transaction = await sequelize.transaction()
    try {
      const Guid = generateId()
      await Product.create(
        {
          ...entity,
          Guid,
          IsDeleted: false,
        } as unknown as Optional<ProductAttrs, DefaultHiddenFields>,
        { transaction },
      )
      await transaction.commit()
      return Guid
    } catch (error) {
      await transaction.rollback()
      return null
    }
  }

  async updateOne<ProductCreationAttrs>(guid: GUID, entity: ProductCreationAttrs): Promise<GUID | null> {
    const product = await this.getOne(guid)
    if (!product) return null
    const transaction = await sequelize.transaction()
    try {
      const Guid = generateId()
      await Product.update(
        {
          ...entity,
        },
        {
          where: {
            Guid: guid,
            IsDeleted: false,
          },
          transaction,
        },
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
        res = await Product.destroy({
          where: {
            Guid: guid,
          },
          transaction,
        })
      } else {
        res = await Product.update(
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
