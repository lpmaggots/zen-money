import type { TransactionType } from './transaction'

export type FilterType = TransactionType | 'all'

export interface FilterState {
  type: FilterType
  search: string
}
