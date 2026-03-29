<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useTransactionsStore } from '@/stores/transactions'
import TransactionItem from '@/views/Dashboard/components/TransactionItem.vue'
import { useWindowScroll } from '@/composables/useWindowScroll'

const emit = defineEmits<{ delete: [id: string] }>()
const store = useTransactionsStore()
const ITEM_HEIGHT = 64
const BUFFER = 8

const containerRef = ref<HTMLDivElement | null>(null)
const scrollTop = ref(0)
const viewportHeight = ref(window.innerHeight)

const { scrollY } = useWindowScroll()

watch(scrollY, () => {
  if (!containerRef.value) return
  scrollTop.value = Math.max(0, -containerRef.value.getBoundingClientRect().top)
  viewportHeight.value = window.innerHeight
})

const transactions = computed(() => store.filteredTransactions)

const totalHeight = computed(() => transactions.value.length * ITEM_HEIGHT)

const startIndex = computed(() =>
  Math.max(0, Math.floor(scrollTop.value / ITEM_HEIGHT) - BUFFER),
)

const endIndex = computed(() =>
  Math.min(
    transactions.value.length,
    Math.ceil((scrollTop.value + viewportHeight.value) / ITEM_HEIGHT) + BUFFER,
  ),
)

const visibleItems = computed(() =>
  transactions.value.slice(startIndex.value, endIndex.value),
)

const offsetY = computed(() => startIndex.value * ITEM_HEIGHT)

watch(
  () => [store.filterState.type, store.filterState.search],
  async () => {
    const wasScrolledPast = scrollTop.value > 0
    scrollTop.value = 0
    await nextTick()
    if (wasScrolledPast && containerRef.value) {
      const top = containerRef.value.getBoundingClientRect().top + window.scrollY - 200
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    }
  },
)
</script>

<template>
  <div class="card-surface overflow-hidden">
    <div class="border-b border-base-border px-4 py-2.5">
      <p class="text-xs text-muted">
        {{ transactions.length.toLocaleString('pt-BR') }} transações
      </p>
    </div>

    <div
      v-if="store.isLoading"
      class="flex items-center justify-center py-20"
    >
      <div class="flex flex-col items-center gap-3">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-base-border border-t-zen-primary" />
        <p class="text-sm text-muted">Carregando transações...</p>
      </div>
    </div>

    <div
      v-else-if="transactions.length === 0"
      class="flex items-center justify-center py-20 h-[calc(100vh-420px)]"
    >
      <p class="text-sm text-muted">Nenhuma transação encontrada.</p>
    </div>

    <div
      v-else
      ref="containerRef"
      :style="{ height: totalHeight + 'px', position: 'relative' }"
    >
      <div
        :style="{
          position: 'absolute',
          width: '100%',
          transform: `translateY(${offsetY}px)`,
        }"
      >
        <TransactionItem
          v-for="item in visibleItems"
          :key="item.id"
          :transaction="item"
          @delete="emit('delete', $event)"
        />
      </div>
    </div>
  </div>
</template>
