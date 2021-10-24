import { Model } from 'sequelize'
import { IModel } from '../models/contract'
import { GUID } from '../types/guid'

export interface IRepository<T extends IModel> {
  getAll<T extends Model>(offset: number, limit: number): Promise<T[]>
  getAllByName<T extends Model>(offset: number, limit: number, name: string): Promise<T[]>
  getOne<T extends Model>(id: GUID): Promise<T | null>
}
