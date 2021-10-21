import { Model } from 'sequelize'
import { GUID } from '../types/guid'
import { IBaseModel } from './contract'

abstract class BaseModel<T extends IBaseModel<GUID>, U extends {} = T> extends Model<T, U> implements IBaseModel<GUID> {
  public guid!: GUID
  public createdBy?: string
  public createdAt?: Date
  public modifiedBy?: string
  public modifiedAt?: Date
  public isDeleted: boolean = false
}

export { BaseModel }
