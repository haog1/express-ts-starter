import { IRepository } from '.'
import { DefaultHiddenFields, IModel } from '../models'
import { GUID } from '../types/guid'
import { Model, Optional } from 'sequelize'

export abstract class BaseRepository implements IRepository {
  abstract create<T extends Optional<IModel<number, GUID>, DefaultHiddenFields>>(entity: T): Promise<GUID | null>
  abstract updateOne<T extends Optional<IModel<number, GUID>, DefaultHiddenFields>>(
    guid: GUID,
    entity: T,
  ): Promise<GUID | null>
}
