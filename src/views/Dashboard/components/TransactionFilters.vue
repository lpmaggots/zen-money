<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTransactionsStore } from '@/stores/transactions'
import Input from '@/components/common/Input.vue'
import ButtonGroup from '@/components/common/ButtonGroup.vue'
import type { ButtonGroupOption } from '@/components/common/ButtonGroup.vue'
import type { FilterType } from '@/types'

const store = useTransactionsStore()

const filterButtons: ButtonGroupOption[] = [
  { label: 'Todos', value: 'all' },
  { label: 'Entradas', value: 'income' },
  { label: 'Saídas', value: 'expense' },
]

const searchInput = ref(store.filterState.search)

let debounceTimer: ReturnType<typeof setTimeout>

watch(searchInput, (value) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => store.setSearchFilter(value), 1)
})
</script>

<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <ButtonGroup
      :model-value="store.filterState.type"
      :options="filterButtons"
      @update:model-value="store.setTypeFilter($event as FilterType)"
    />
    <div class="w-full sm:max-w-xs">
      <Input v-model="searchInput" placeholder="Buscar por descrição..." />
    </div>
  </div>
</template>
