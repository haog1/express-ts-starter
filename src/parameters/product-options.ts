import { BaseParameter, PaginationParameters } from '.'
import { GUID } from '../types/guid'

export interface GetProductOptionByIdParameter extends BaseParameter {
  guid: GUID
}

export interface RemoveProductOptionParameter extends BaseParameter {
  force: boolean
}

// shouldn't expose model attr structure to the public directly
export interface CreateProductOptionParameters extends BaseParameter {
  name: string
  productId: GUID
  description: string
}
