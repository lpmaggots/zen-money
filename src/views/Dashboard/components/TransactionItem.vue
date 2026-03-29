<script setup lang="ts">
import type { Transaction } from '@/types'
import { CATEGORY_LABELS } from '@/types'
import { Trash2 } from 'lucide-vue-next'
import { CATEGORY_META, getTypeColorClass } from '@/utils/categories'
import { formatCurrency, formatDate } from '@/utils/formatters'
import FabButton from '@/components/common/FabButton.vue'

interface Props {
  transaction: Transaction
}

defineProps<Props>()
defineEmits<{ delete: [id: string] }>()
</script>

<template>
  <div class="flex h-16 items-center justify-between gap-4 border-b border-base-border px-4 last:border-b-0">
    <div
      :class="[
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
        CATEGORY_META[transaction.category].classes,
      ]"
    >
      <component :is="CATEGORY_META[transaction.category].icon" :size="16" />
    </div>

    <div class="min-w-0 flex-1">
      <p class="truncate text-sm font-medium text-base-text mb-1">
        {{ transaction.description }}
      </p>
      <p class="truncate text-xs text-muted">
        {{ CATEGORY_LABELS[transaction.category] }} · {{ formatDate(transaction.date) }}
      </p>
    </div>

    <div class="flex shrink-0 items-center gap-3">
      <span
        :class="[
          'text-sm font-medium tabular-nums',
          getTypeColorClass(transaction.type),
        ]"
      >
        {{ transaction.type === 'income' ? '+' : '-' }}
        {{ formatCurrency(transaction.amount) }}
      </span>

      <FabButton label="Excluir transação" variant="ghost" size="md" @click="$emit('delete', transaction.id)">
        <Trash2 :size="15" />
      </FabButton>
    </div>
  </div>
</template>
