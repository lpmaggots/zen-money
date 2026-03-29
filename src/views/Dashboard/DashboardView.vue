<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useTransactionsStore } from '@/stores/transactions'
import Header from '@/components/layout/Header.vue'
import SummaryCards from './components/SummaryCards.vue'
import TransactionFilters from './components/TransactionFilters.vue'
import TransactionList from './components/TransactionList.vue'
import TransactionFormDialog from './components/TransactionFormDialog.vue'
import DeleteDialog from './components/DeleteDialog.vue'
import type { TransactionFormDialogData } from '@/types'

const store = useTransactionsStore()
const isFormOpen = ref(false)

const openForm = () => {
  isFormOpen.value = true
}

const closeForm = () => {
  isFormOpen.value = false
}

const handleAddTransaction = (data: TransactionFormDialogData) => {
  store.addTransaction(data)
  closeForm()
}

const deleteTarget = ref<{ id: string; description: string } | null>(null)

const requestDelete = (id: string) => {
  const transaction = store.transactions.find((t) => t.id === id)
  if (!transaction) return
  deleteTarget.value = { id, description: transaction.description }
}

const cancelDelete = () => {
  deleteTarget.value = null
}

const confirmDelete = () => {
  if (deleteTarget.value) {
    store.deleteTransaction(deleteTarget.value.id)
    deleteTarget.value = null
  }
}

const sentinelRef = ref<HTMLDivElement | null>(null)
const filtersStuck = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (sentinelRef.value) {
    observer = new IntersectionObserver(
      ([entry]) => { if (entry) filtersStuck.value = !entry.isIntersecting },
      { rootMargin: '-84px 0px 0px 0px', threshold: 0 },
    )
    observer.observe(sentinelRef.value)
  }
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div class="min-h-screen bg-base-bg">
    <Header :on-new-transaction="openForm" />

    <section class="mx-auto max-w-7xl px-4 pt-4 pb-6 sm:px-6">
      <SummaryCards />
    </section>

    <div ref="sentinelRef" class="h-0" />
    <section
      :class="[
        'sticky top-21 z-30 border-y transition-all duration-300',
        filtersStuck
          ? 'border-base-border/50 bg-base-card/70 backdrop-blur-sm'
          : 'border-transparent bg-transparent',
      ]"
    >
      <div :class="[
          'mx-auto max-w-7xl px-4 sm:px-6',
          filtersStuck ? 'py-3' : 'py-0'
        ]"
      >
        <TransactionFilters />
      </div>
    </section>

    <main class="mx-auto max-w-7xl px-4 pt-4 pb-16 sm:px-6">
      <TransactionList @delete="requestDelete" />
    </main>

    <TransactionFormDialog
      :open="isFormOpen"
      @close="closeForm"
      @submit="handleAddTransaction"
    />

    <DeleteDialog
      :open="deleteTarget !== null"
      :transaction-description="deleteTarget?.description"
      :transaction-value="store.transactions.find(t => t.id === deleteTarget?.id)?.amount"
      @close="cancelDelete"
      @confirm="confirmDelete"
    />
  </div>
</template>
