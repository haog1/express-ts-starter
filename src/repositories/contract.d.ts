import { Model } from 'sequelize'
import { IModel } from '../models/contract'
import { ProductCreationAttrs } from '../models/product'
import { GUID } from '../types/guid'

export interface IRepository<T extends IModel> {
  getAll<M extends Model>(offset: number, limit: number): Promise<M[]>
  getAllByName<M extends Model>(offset: number, limit: number, name: string): Promise<M[]>
  getOne<M extends Model>(id: GUID): Promise<M | null>
  create(entity: ProductCreationAttrs): Promise<GUID | null>
}
