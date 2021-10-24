import { BaseParameter, PaginationParameters } from '.'
import { GUID } from '../types/guid'

export interface GetProductsParameters extends PaginationParameters {
  name?: string
}

export interface GetProductByIdParameter extends BaseParameter {
  guid: GUID
}

export interface RemoveProductParameter extends BaseParameter {
  force: boolean
}

// shouldn't expose model attr structure to the public directly
export interface CreateProductParameters extends BaseParameter {
  name: string
  description: string
  price: number
  deliveryPrice: number
}
