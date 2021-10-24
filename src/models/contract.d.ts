export interface IModel<T, U> {
  Id: T
  Guid: U
  IsDeleted: Boolean
}

export type DefaultHiddenFields = 'Id' | 'Guid' | 'IsDeleted'
