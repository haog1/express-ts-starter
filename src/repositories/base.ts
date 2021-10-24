import { IRepository } from './contract'
import { IModel } from '../models/contract'
import { GUID } from '../types/guid'
import { Model } from 'sequelize'
import { ProductCreationAttrs } from '../models/product'

export abstract class BaseRepository implements IRepository<IModel<number, GUID>> {
  abstract getAll<T extends Model>(offset: number, limit: number): Promise<T[]>
  abstract getAllByName<T extends Model>(offset: number, limit: number, name: string): Promise<T[]>
  abstract getOne<T extends Model>(guid: GUID): Promise<T | null>
  abstract create(entity: ProductCreationAttrs): Promise<GUID | null>
}
