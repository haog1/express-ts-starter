import { Model } from 'sequelize/types'
import { GUID } from '../types/guid'
import { IBase } from './interfaces/ibase'

abstract class BaseModel<T extends IBase, U extends {} = T> extends Model<T, U> {
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
