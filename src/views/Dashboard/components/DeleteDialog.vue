<script setup lang="ts">
import Dialog from '@/components/common/Dialog.vue'
import Button from '@/components/common/Button.vue'
import { formatCurrency } from '@/utils/formatters'

interface Props {
  open: boolean
  transactionDescription?: string
  transactionValue?: number
}

withDefaults(defineProps<Props>(), {
  transactionDescription: '',
  transactionValue: 0,
})

const emit = defineEmits<{
  close: []
  confirm: []
}>()

</script>

<template>
  <Dialog :open="open" title="Excluir Transação" maxWidth="md" @close="emit('close')">
    <p class="text-sm text-muted">
      Tem certeza que deseja excluir
      <span v-if="transactionDescription" class="font-medium text-muted">{{ transactionDescription }} ({{ transactionValue && formatCurrency(transactionValue) }})</span>
      Essa ação não pode ser desfeita.
    </p>

    <div class="mt-5 flex justify-end gap-3">
      <Button variant="secondary" @click="emit('close')">
        Cancelar
      </Button>
      <Button variant="danger" @click="emit('confirm')">
        Excluir
      </Button>
    </div>
  </Dialog>
</template>
