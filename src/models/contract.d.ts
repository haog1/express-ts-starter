export interface IBaseModel<T> {
  guid: T
  isDeleted: boolean
}

export interface IBaseReturnAttrs<T> {
  Id?: T
}

export type DefaultHiddenFields = 'guid' | 'isDeleted'
