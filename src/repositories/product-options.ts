import { Model, Optional } from 'sequelize'
import { IProductOptionsRepository } from '.'
import { DefaultHiddenFields } from '../models'
import { ProductOptionAttrs, ProductOption } from '../models/product-option'
import { GUID } from '../types/guid'
import { sequelize, generateId } from '../utils'
import { BaseRepository } from './base'

export class ProductOptionOptionsRepository extends BaseRepository implements IProductOptionsRepository {
  async getAll<ProductOption>(productId: GUID, limit: number = 5, offset: number = 0): Promise<ProductOption[]> {
    const productOptions = await ProductOption.findAll({
      attributes: {
        include: [['guid', 'Id']],
        exclude: ['Id', 'Guid', 'IsDeleted'],
      },
      where: {
        ProductId: productId,
        IsDeleted: false,
      },
      limit,
      offset,
      order: [['id', 'desc']],
      raw: true,
    })
    return productOptions.map((ProductOption: Partial<ProductOptionAttrs>) => ProductOption as ProductOption)
  }

  async getOne<ProductOption>(guid: GUID, productId?: GUID): Promise<ProductOption | null> {
    return (await ProductOption.findOne({
      attributes: {
        include: [['guid', 'Id']],
        exclude: ['Id', 'Guid', 'IsDeleted'],
      },
      where: {
        Guid: guid,
        ...(productId ? { ProductId: productId } : {}),
        IsDeleted: false,
      },
      raw: true,
    })) as Partial<ProductOptionAttrs> as ProductOption
  }

  async create<ProductOptionCreationAttrs>(entity: ProductOptionCreationAttrs): Promise<GUID | null> {
    const transaction = await sequelize.transaction()
    try {
      const Guid = generateId()
      await ProductOption.create(
        {
          ...entity,
          Guid,
          IsDeleted: false,
        } as unknown as Optional<ProductOptionAttrs, DefaultHiddenFields>,
        { transaction },
      )
      await transaction.commit()
      return Guid
    } catch (error) {
      await transaction.rollback()
      return null
    }
  }

  async updateOne<ProductOptionCreationAttrs>(guid: GUID, entity: ProductOptionCreationAttrs): Promise<GUID | null> {
    const productOption = await this.getOne(guid)
    if (!productOption) return null
    const transaction = await sequelize.transaction()
    try {
      const Guid = generateId()
      await ProductOption.update(
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

  async delete(guid: GUID, productId: GUID, force?: boolean): Promise<boolean> {
    const productOption = await this.getOne(guid)
    if (!productOption) return false
    const transaction = await sequelize.transaction()

    try {
      let res
      if (force) {
        res = await ProductOption.destroy({
          where: {
            Guid: guid,
            ProductId: productId,
          },
          transaction,
        })
      } else {
        res = await ProductOption.update(
          {
            IsDeleted: true,
          },
          {
            where: {
              Guid: guid,
              ProductId: productId,
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
