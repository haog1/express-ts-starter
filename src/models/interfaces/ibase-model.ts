import { GUID } from '../../types/guid'

export interface IBaseModel {
  readonly id: number
  readonly guid: GUID
  createdBy?: string
  createdAt?: Date
  modifiedBy?: string
  modifiedAt?: Date
  _isDeleted: boolean
}
