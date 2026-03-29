<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import Dialog from '@/components/common/Dialog.vue'
import Input from '@/components/common/Input.vue'
import Select from '@/components/common/Select.vue'
import Button from '@/components/common/Button.vue'
import DatePicker from '@/components/common/DatePicker.vue'
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES, CATEGORY_LABELS } from '@/types'
import type { TransactionFormDialogData, TransactionType, Category } from '@/types'
import type { SelectOption } from '@/components/common/Select.vue'
import { transactionSchema } from '@/schemas/transaction.schema'

interface Props {
  open: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  submit: [data: TransactionFormDialogData]
}>()

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(transactionSchema),
  initialValues: {
    description: '',
    amount: '',
    type: '',
    category: '',
    date: new Date().toISOString().slice(0, 10),
  },
})

const { value: description, errorMessage: descriptionError } = useField<string>('description')
const { value: amount, errorMessage: amountError } = useField<string>('amount')
const { value: type, errorMessage: typeError } = useField<string>('type')
const { value: category, errorMessage: categoryError } = useField<string>('category')
const { value: date, errorMessage: dateError } = useField<string>('date')

const amountDisplay = ref('')

const handleAmountInput = (raw: string): void => {
  const digits = raw.replace(/\D/g, '')
  if (!digits) {
    amountDisplay.value = ''
    amount.value = ''
    return
  }
  const numeric = parseInt(digits, 10) / 100
  amountDisplay.value = numeric.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  amount.value = numeric.toFixed(2)
}

const typeOptions: SelectOption[] = [
  { value: 'income', label: 'Entrada' },
  { value: 'expense', label: 'Saída' },
]

const categoryOptions = computed<SelectOption[]>(() => {
  if (!type.value) return []
  const cats = type.value === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
  return cats.map((c) => ({ value: c, label: CATEGORY_LABELS[c] }))
})

watch(type, () => {
  category.value = ''
})

watch(
  () => props.open,
  (val) => {
    if (!val) {
      resetForm()
      amountDisplay.value = ''
    }
  },
)

const onSubmit = handleSubmit((values) => {
  emit('submit', {
    description: values.description,
    amount: Number(values.amount),
    type: values.type as TransactionType,
    category: values.category as Category,
    date: values.date,
  })
})

const handleClose = (): void => {
  emit('close')
}
</script>

<template>
  <Dialog :open="open" title="Nova Transação" max-width="2xl" @close="handleClose">
    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <Input
        v-model="description"
        label="Descrição"
        placeholder="Ex: Salário de março"
        :error-message="descriptionError"
        required
      />

      <div class="grid grid-cols-2 gap-4">
        <Select
          v-model="type"
          label="Tipo"
          :options="typeOptions"
          :error-message="typeError"
          required
        />
        <Input
          :model-value="amountDisplay"
          label="Valor (R$)"
          type="text"
          placeholder="0,00"
          :error-message="amountError"
          required
          @update:model-value="handleAmountInput"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <Select
          v-model="category"
          label="Categoria"
          :options="categoryOptions"
          :disabled="!type"
          :error-message="categoryError"
          required
        />
        <DatePicker
          v-model="date"
          label="Data"
          :error-message="dateError"
          required
        />
      </div>

      <div class="mt-2 flex justify-end gap-3">
        <Button variant="secondary" type="button" @click="handleClose">
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </div>
    </form>
  </Dialog>
</template>
