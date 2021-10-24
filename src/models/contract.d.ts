export interface IModel<T> {
  Id: T
  IsDeleted: boolean
}

export interface IBaseReturnAttrs<T> {
  Id?: T
}

export type DefaultHiddenFields = 'Id' | 'IsDeleted'
