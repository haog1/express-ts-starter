import { PaginationParameters } from '.'
import { GUID } from '../types/guid'

export interface GetProductsParameters extends PaginationParameters {
  name?: string
}

export interface GetProductByIdParameter {
  id: GUID
}
