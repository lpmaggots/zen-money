import type { Component } from 'vue'
import type { Category, TransactionType } from '@/types/transaction'
import {
  Briefcase,
  Laptop,
  TrendingUp,
  UtensilsCrossed,
  Car,
  HeartPulse,
  GraduationCap,
  Clapperboard,
  House,
  ShoppingBag,
  CircleDashed,
} from 'lucide-vue-next'

export interface CategoryMeta {
  icon: Component
  classes: string
}

export const CATEGORY_LABELS: Record<Category, string> = {
  salary:        'Salário',
  freelance:     'Freelance',
  investment:    'Investimento',
  food:          'Alimentação',
  transport:     'Transporte',
  health:        'Saúde',
  education:     'Educação',
  entertainment: 'Lazer',
  housing:       'Moradia',
  clothing:      'Vestuário',
  other:         'Outros',
}

export const INCOME_CATEGORIES: Category[] = [
  'salary',
  'freelance',
  'investment',
  'other',
]

export const EXPENSE_CATEGORIES: Category[] = [
  'food',
  'transport',
  'health',
  'education',
  'entertainment',
  'housing',
  'clothing',
  'other',
]

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  salary:        { icon: Briefcase,       classes: 'bg-violet-100 text-zen-primary dark:bg-base-card dark:border dark:border-zen-primary' },
  freelance:     { icon: Laptop,          classes: 'bg-violet-100 text-zen-primary dark:bg-base-card dark:border dark:border-zen-primary' },
  investment:    { icon: TrendingUp,      classes: 'bg-emerald-100 text-zen-success dark:bg-base-card dark:border dark:border-zen-success' },
  food:          { icon: UtensilsCrossed, classes: 'bg-orange-100 text-orange-500 dark:bg-base-card dark:border dark:border-orange-500' },
  transport:     { icon: Car,             classes: 'bg-blue-100 text-blue-500 dark:bg-base-card dark:border dark:border-blue-500' },
  health:        { icon: HeartPulse,      classes: 'bg-red-100 text-zen-error dark:bg-base-card dark:border dark:border-zen-error' },
  education:     { icon: GraduationCap,   classes: 'bg-indigo-100 text-indigo-500 dark:bg-base-card dark:border dark:border-indigo-500' },
  entertainment: { icon: Clapperboard,    classes: 'bg-purple-100 text-purple-500 dark:bg-base-card dark:border dark:border-purple-500' },
  housing:       { icon: House,           classes: 'bg-yellow-100 text-yellow-600 dark:bg-base-card dark:border dark:border-yellow-600' },
  clothing:      { icon: ShoppingBag,     classes: 'bg-pink-100 text-pink-500 dark:bg-base-card dark:border dark:border-pink-500' },
  other:         { icon: CircleDashed,    classes: 'bg-base-border text-muted dark:bg-base-card dark:border dark:border-base-border' },
}

export function getTypeColorClass(type: TransactionType): string {
  return type === 'income' ? 'text-income' : 'text-expense'
}
