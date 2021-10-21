import { IBaseModel } from '../models/contract'

export interface IRepository<T extends IBaseModel> {
  getAll<T>(): Promise<T[]>
  getOne<T>(param: any): Promise<T>
  create<T>(entity: T): Promise<void>
  update<T>(entity: T): Promise<void>
  delete<T>(entity: T): Promise<void>
}
