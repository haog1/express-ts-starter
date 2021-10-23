import { Model } from 'sequelize'
import { IModel } from '../models/contract'

export interface IRepository<T extends IModel> {
  getAll<T extends Model>(): Promise<T[]>
}
