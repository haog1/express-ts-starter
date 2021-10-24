export interface IModel<T> {
  Id: number
  Guid: T
  IsDeleted: boolean
}

export type DefaultHiddenFields = 'Id' | 'Guid' | 'IsDeleted'
