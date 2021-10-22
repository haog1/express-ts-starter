export interface IModel<T> {
  guid: T
  isDeleted: boolean
}

export interface IBaseReturnAttrs<T> {
  Id?: T
}

export type DefaultHiddenFields = 'guid' | 'isDeleted'
