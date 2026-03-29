<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import { useTransactionsStore } from '@/stores/transactions'
import Card from '@/components/common/Card.vue'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-vue-next'
import { formatCurrency } from '@/utils/formatters'

const store = useTransactionsStore()

interface SummaryCardItem {
  label: string
  value: string
  colorClass: string
  icon: Component
}

const cards = computed((): SummaryCardItem[] => [
  {
    label: 'Total de Entradas',
    value: formatCurrency(store.totalIncome),
    colorClass: 'text-income',
    icon: TrendingUp,
  },
  {
    label: 'Total de Saídas',
    value: formatCurrency(store.totalExpenses),
    colorClass: 'text-expense',
    icon: TrendingDown,
  },
  {
    label: 'Saldo',
    value: formatCurrency(store.balance),
    colorClass: store.balance >= 0 ? 'text-income' : 'text-expense',
    icon: Wallet,
  },
])
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
    <Card v-for="card in cards" :key="card.label">
      <div class="flex items-center justify-between">
        <p class="text-sm text-muted">{{ card.label }}</p>
        <component :is="card.icon" :size="22" class="text-muted" />
      </div>
      <p :class="['mt-1 text-2xl font-bold tabular-nums', card.colorClass]">
        {{ card.value }}
      </p>
    </Card>
  </div>
</template>
