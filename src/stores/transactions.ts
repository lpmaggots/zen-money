import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Transaction, TransactionFormDialogData, FilterState } from '@/types'

export const useTransactionsStore = defineStore('transactions', () => {
  // states
  const transactions = ref<Transaction[]>([])
  const isLoading = ref(true)

  const filterState = ref<FilterState>({
    type: 'all',
    search: '',
  })

  // Load transactions using a Web Worker to avoid blocking the UI
  const worker = new Worker(
    new URL('../workers/mockData.worker.ts', import.meta.url),
    { type: 'module' },
  )
  worker.onmessage = (event: MessageEvent<Transaction[]>) => {
    transactions.value = event.data
    isLoading.value = false
    worker.terminate()
  }
  worker.onerror = () => {
    isLoading.value = false
    worker.terminate()
  }

  // getters
  const filteredTransactions = computed(() => {
    const { type, search } = filterState.value
    const term = search.trim().toLowerCase()

    return transactions.value.filter((t) => {
      const matchesType = type === 'all' || t.type === type
      const matchesSearch = term === '' || t.description.toLowerCase().includes(term)
      return matchesType && matchesSearch
    })
  })

  // Calculate totals
  const _totals = computed(() =>
    transactions.value.reduce(
      (acc, t) => {
        if (t.type === 'income') acc.income += t.amount
        else acc.expense += t.amount
        return acc
      },
      { income: 0, expense: 0 },
    ),
  )

  const totalIncome = computed(() => _totals.value.income)
  const totalExpenses = computed(() => _totals.value.expense)
  const balance = computed(() => totalIncome.value - totalExpenses.value)

  // actions
  const addTransaction = (formData: TransactionFormDialogData): void => {
    if (
      !formData.description ||
      formData.amount === null ||
      !formData.type ||
      !formData.category ||
      !formData.date
    ) {
      return
    }

    const newTransaction: Transaction = {
      id: String(Date.now()),
      description: formData.description,
      amount: formData.amount,
      type: formData.type,
      category: formData.category,
      date: formData.date,
    }

    transactions.value.unshift(newTransaction)
  }

  const deleteTransaction = (id: string): void => {
    const index = transactions.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      transactions.value.splice(index, 1)
    }
  }

  const setTypeFilter = (type: FilterState['type']): void => {
    filterState.value.type = type
  }

  const setSearchFilter = (search: string): void => {
    filterState.value.search = search
  }

  return {
    // state
    transactions,
    filterState,
    isLoading,
    // getters
    filteredTransactions,
    totalIncome,
    totalExpenses,
    balance,
    // actions
    addTransaction,
    deleteTransaction,
    setTypeFilter,
    setSearchFilter,
  }
})
