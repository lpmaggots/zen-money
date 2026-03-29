import type { Transaction, TransactionType, Category } from '@/types'
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '@/utils/categories'

const INCOME_DESCRIPTIONS = [
  'Salário mensal',
  'Freelance — desenvolvimento web',
  'Freelance — design gráfico',
  'Dividendos de ações',
  'Rendimento CDB',
  'Rendimento Tesouro Direto',
  'Bônus trimestral',
  'Consultoria pontual',
  'Venda de curso online',
  'Aluguel de imóvel',
]

const EXPENSE_DESCRIPTIONS = [
  'Supermercado',
  'Restaurante',
  'iFood',
  'Uber',
  'Combustível',
  'Metrô / ônibus',
  'Plano de saúde',
  'Consulta médica',
  'Farmácia',
  'Mensalidade faculdade',
  'Curso de inglês',
  'Netflix',
  'Spotify',
  'Amazon Prime',
  'Academia',
  'Cinema',
  'Bar / happy hour',
  'Aluguel',
  'Condomínio',
  'Conta de luz',
  'Conta de água',
  'Internet',
  'Celular',
  'Roupa / tênis',
  'Presente',
]

const CATEGORY_BY_TYPE: Record<TransactionType, Category[]> = {
  income: INCOME_CATEGORIES,
  expense: EXPENSE_CATEGORIES,
}

const DESCRIPTIONS_BY_TYPE: Record<TransactionType, string[]> = {
  income: INCOME_DESCRIPTIONS,
  expense: EXPENSE_DESCRIPTIONS,
}

let _idCounter = 1

const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

const randomItem = <T>(arr: T[]): T =>
  arr[randomInt(0, arr.length - 1)] as T

const randomDate = (startYear: number, endYear: number): string => {
  const start = new Date(startYear, 0, 1).getTime()
  const end = new Date(endYear, 11, 31).getTime()
  const date = new Date(start + Math.random() * (end - start))
  return date.toISOString().slice(0, 10)
}

const generateTransaction = (): Transaction => {
  const type: TransactionType = Math.random() < 0.35 ? 'income' : 'expense'
  const category = randomItem(CATEGORY_BY_TYPE[type])
  const description = randomItem(DESCRIPTIONS_BY_TYPE[type])

  const amount =
    type === 'income'
      ? parseFloat((randomInt(1_000, 15_000) + Math.random()).toFixed(2))
      : parseFloat((randomInt(10, 2_000) + Math.random()).toFixed(2))

  return {
    id: String(_idCounter++),
    description,
    amount,
    type,
    category,
    date: randomDate(2024, 2026),
  }
}

export function generateMockTransactions(count: number = 30_000): Transaction[] {
  _idCounter = 1
  return Array.from({ length: count }, generateTransaction)
}
