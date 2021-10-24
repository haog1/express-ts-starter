import { IRepository } from './contract'
import { IModel } from '../models/contract'
import { GUID } from '../types/guid'
import { Model } from 'sequelize'

export abstract class BaseRepository implements IRepository<IModel<GUID>> {
  public abstract getAll<T extends Model>(offset: number, limit: number): Promise<T[]>
  public abstract getAllByName<T extends Model>(offset: number, limit: number, name: string): Promise<T[]>
  public abstract getOne<T extends Model>(id: GUID): Promise<T | null>
}
