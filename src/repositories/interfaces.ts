import { Model, Optional } from 'sequelize'
import { DefaultHiddenFields, IModel } from '../models'
import { GUID } from '../types/guid'

export interface IRepository {
  getAll<M extends Model>(offset: number, limit: number): Promise<M[]>
  getAllByName<M extends Model>(offset: number, limit: number, name: string): Promise<M[]>
  getOne<M extends Model>(guid: GUID): Promise<M | null>
  create(entity: Optional<IModel<number, GUID>, DefaultHiddenFields>): Promise<GUID | null>
  updateOne(guid: GUID, entity: Optional<IModel<number, GUID>, DefaultHiddenFields>): Promise<GUID | null>
  delete(guid: GUID, force?: boolean): Promise<boolean>
}
