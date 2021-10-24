import { BaseParameter } from '.'

export interface PaginationParameters extends BaseParameter {
  offset: number
  limit: number
}
