import { IRepository } from '.'
import { IModel, ProductCreationAttrs } from '../models'
import { GUID } from '../types/guid'
import { Model } from 'sequelize'

export abstract class BaseRepository implements IRepository<IModel<number, GUID>> {
  abstract getAll<T extends Model>(offset: number, limit: number): Promise<T[]>
  abstract getAllByName<T extends Model>(offset: number, limit: number, name: string): Promise<T[]>
  abstract getOne<T extends Model>(guid: GUID): Promise<T | null>
  abstract create(entity: ProductCreationAttrs): Promise<GUID | null>
  abstract updateOne(guid: GUID, entity: ProductCreationAttrs): Promise<GUID | null>
  abstract delete(guid: string, force?: boolean): Promise<boolean>
}
