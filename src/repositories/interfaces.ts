import { Model, Optional } from 'sequelize'
import { DefaultHiddenFields, IModel, Product, ProductOption } from '../models'
import { GUID } from '../types/guid'

export interface IRepository {
  create(entity: Optional<IModel<number, GUID>, DefaultHiddenFields>): Promise<GUID | null>
  updateOne(guid: GUID, entity: Optional<IModel<number, GUID>, DefaultHiddenFields>): Promise<GUID | null>
}

export interface IProductsRepository extends IRepository {
  getAll<M extends Product>(limit: number, offset: number): Promise<M[]>
  getAllByName<M extends Product>(limit: number, offset: number, name: string): Promise<M[]>
  getOne<M extends Product>(guid: GUID): Promise<M | null>
  delete(guid: GUID, force?: boolean): Promise<boolean>
}

export interface IProductOptionsRepository extends IRepository {
  getAll<M extends ProductOption>(productId: GUID, limit: number, offset: number): Promise<M[]>
  getOne<M extends ProductOption>(guid: GUID, productId?: GUID): Promise<M | null>
  delete(guid: GUID, productId: GUID, force?: boolean): Promise<boolean>
}
