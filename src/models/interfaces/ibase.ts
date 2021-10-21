import { GUID } from '../../types/guid'

export interface IBase {
  readonly id: number
  readonly guid: GUID
  createdBy?: string
  createdAt?: Date
  modifiedBy?: string
  modifiedAt?: Date
  _isDeleted: boolean
}
