import { Model } from 'sequelize'
import { GUID } from '../types/guid'
import { IModel } from './contract'

abstract class BaseModel<T extends IModel<GUID>, U extends {} = T> extends Model<T, U> implements IModel<GUID> {
  public guid!: GUID
  public isDeleted: boolean = false
}

export { BaseModel }
