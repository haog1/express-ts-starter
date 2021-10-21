import { Model } from 'sequelize'
import { GUID } from '../types/guid'
import { IBaseModel } from './contract'

abstract class BaseModel<T extends IBaseModel<GUID>, U extends {} = T> extends Model<T, U> implements IBaseModel<GUID> {
  public guid!: GUID
  public isDeleted: boolean = false
}

export { BaseModel }
