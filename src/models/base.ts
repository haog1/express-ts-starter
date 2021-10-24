import { Model } from 'sequelize'
import { GUID } from '../types/guid'
import { IModel } from './contract'

abstract class BaseModel<T extends IModel<GUID>, U extends {} = T> extends Model<T, U> implements IModel<GUID> {
  public Id!: number
  public Guid!: GUID
  public IsDeleted: boolean = false
}

export { BaseModel }
