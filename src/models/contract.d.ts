export interface IModel<T, U> {
  Id: T
  Guid: U
  IsDeleted: boolean
}

export type DefaultHiddenFields = 'Id' | 'Guid' | 'IsDeleted'
