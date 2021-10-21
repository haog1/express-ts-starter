export interface IBaseModel<T> {
  guid: T
}

export interface IBaseReturnAttrs<T> {
  Id?: T
}

export type DefaultHiddenFields = 'guid' | 'isDeleted'
