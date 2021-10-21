import { Model } from 'sequelize'
import { GUID } from '../types/guid'
import { IBaseModel } from './def'

abstract class BaseModel<T extends IBaseModel, U extends {} = T> extends Model<T, U> {
  public readonly id!: number
  public readonly guid!: GUID
  public createdBy?: string | undefined
  public createdAt?: Date | undefined
  public modifiedBy?: string | undefined
  public modifiedAt?: Date | undefined
  public _isDeleted: boolean = false

  public get isDelete(): boolean {
    return this._isDeleted
  }
  public delete(): void {
    this._isDeleted = true
  }
}

export { BaseModel }
