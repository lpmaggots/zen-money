export type TransactionType = 'income' | 'expense'

export type Category =
  | 'salary'
  | 'freelance'
  | 'investment'
  | 'food'
  | 'transport'
  | 'health'
  | 'education'
  | 'entertainment'
  | 'housing'
  | 'clothing'
  | 'other'

export interface Transaction {
  id: string
  description: string
  amount: number
  type: TransactionType
  category: Category
  date: string
}

export interface TransactionFormDialogData {
  description: string
  amount: number | null
  type: TransactionType | null
  category: Category | null
  date: string
}


