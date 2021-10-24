import { IRepository } from '.'
import { DefaultHiddenFields, IModel } from '../models'
import { GUID } from '../types/guid'
import { Model, Optional } from 'sequelize'

export abstract class BaseRepository implements IRepository {
  abstract getAll<T extends Model>(offset: number, limit: number): Promise<T[]>
  abstract getAllByName<T extends Model>(offset: number, limit: number, name: string): Promise<T[]>
  abstract getOne<T extends Model>(guid: GUID): Promise<T | null>
  abstract create<T extends Optional<IModel<number, GUID>, DefaultHiddenFields>>(entity: T): Promise<GUID | null>
  abstract updateOne<T extends Optional<IModel<number, GUID>, DefaultHiddenFields>>(
    guid: GUID,
    entity: T,
  ): Promise<GUID | null>
  abstract delete(guid: string, force?: boolean): Promise<boolean>
}
