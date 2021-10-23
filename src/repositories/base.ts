import { IRepository } from './contract'
import { IModel } from '../models/contract'
import { GUID } from '../types/guid'
import { Model } from 'sequelize'

export abstract class BaseRepository implements IRepository<IModel<GUID>> {
  public abstract getAll<T extends Model>(): Promise<T[]>
}
