import { Model } from 'sequelize'
import { IModel, ProductCreationAttrs } from '../models'
import { GUID } from '../types/guid'

export interface IRepository<T extends IModel<number, GUID>> {
  getAll<M extends Model>(offset: number, limit: number): Promise<M[]>
  getAllByName<M extends Model>(offset: number, limit: number, name: string): Promise<M[]>
  getOne<M extends Model>(guid: GUID): Promise<M | null>
  create(entity: ProductCreationAttrs): Promise<GUID | null>
  updateOne(guid: GUID, entity: ProductCreationAttrs): Promise<GUID | null>
  delete(guid: GUID, force?: boolean): Promise<boolean>
}
