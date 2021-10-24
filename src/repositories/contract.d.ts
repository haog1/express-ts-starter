import { Model } from 'sequelize'
import { IModel } from '../models/contract'

export interface IRepository<T extends IModel> {
  getAll<T extends Model>(offset: number, limit: number): Promise<T[]>
  getAllByName<T extends Model>(offset: number, limit: number, name: string): Promise<T[]>
}
