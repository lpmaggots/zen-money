<script setup lang="ts">
import { computed } from 'vue'
import {
  DatePickerRoot,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerCalendar,
  DatePickerHeader,
  DatePickerHeading,
  DatePickerPrev,
  DatePickerNext,
  DatePickerGrid,
  DatePickerGridHead,
  DatePickerGridBody,
  DatePickerGridRow,
  DatePickerHeadCell,
  DatePickerCell,
  DatePickerCellTrigger,
} from 'radix-vue'
import { parseDate } from '@internationalized/date'
import type { DateValue } from '@internationalized/date'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { formatDateDisplay } from '@/utils/formatters'

interface Props {
  modelValue?: string | null
  label?: string
  errorMessage?: string
  disabled?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: '',
  errorMessage: '',
  disabled: false,
  required: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const dateValue = computed<DateValue | undefined>(() => {
  if (!props.modelValue) return undefined
  try {
    return parseDate(props.modelValue)
  } catch {
    return undefined
  }
})

const displayValue = computed<string>(() => {
  if (!props.modelValue) return ''
  try {
    const d = parseDate(props.modelValue)
    return formatDateDisplay(d.year, d.month, d.day)
  } catch {
    return ''
  }
})

const handleUpdate = (val: DateValue | undefined): void => {
  if (val) {
    emit('update:modelValue', val.toString())
  }
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-sm font-medium text-base-text">
      {{ label }}
      <span v-if="required" class="text-zen-error ml-0.5">*</span>
    </label>

    <DatePickerRoot
      :model-value="dateValue"
      locale="pt-BR"
      :disabled="disabled"
      @update:model-value="handleUpdate"
    >
      <DatePickerTrigger
        :class="[
          'flex h-10 w-full items-center justify-between rounded-md border bg-base-card px-3 text-sm',
          'transition-colors duration-150 outline-none cursor-pointer',
          'focus:border-zen-primary focus:ring-1 focus:ring-zen-primary',
          'disabled:cursor-not-allowed disabled:opacity-50',
          errorMessage
            ? 'border-zen-error focus:border-zen-error focus:ring-zen-error'
            : 'border-base-border',
          !modelValue ? 'text-zen-secondary-light' : 'text-base-text',
        ]"
      >
        <span>{{ displayValue || 'Selecione uma data' }}</span>
        <Calendar class="h-4 w-4 shrink-0 text-zen-secondary-light" />
      </DatePickerTrigger>

      <DatePickerContent
        :side-offset="4"
        class="z-50 rounded-md border border-base-border bg-base-card p-3 shadow-lg"
      >
        <DatePickerCalendar v-slot="{ grid, weekDays }">
          <DatePickerHeader class="mb-3 flex items-center justify-between">
            <DatePickerPrev
              class="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-zen-secondary transition-colors hover:bg-zen-primary/10 hover:text-zen-primary focus:outline-none focus:ring-1 focus:ring-zen-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft class="h-4 w-4" />
            </DatePickerPrev>

            <DatePickerHeading class="text-sm font-medium capitalize text-base-text" />

            <DatePickerNext
              class="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-zen-secondary transition-colors hover:bg-zen-primary/10 hover:text-zen-primary focus:outline-none focus:ring-1 focus:ring-zen-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight class="h-4 w-4" />
            </DatePickerNext>
          </DatePickerHeader>

          <DatePickerGrid v-for="month in grid" :key="month.value.toString()">
            <DatePickerGridHead>
              <DatePickerGridRow class="mb-1 flex">
                <DatePickerHeadCell
                  v-for="day in weekDays"
                  :key="day"
                  class="flex h-8 w-9 items-center justify-center text-xs font-medium text-zen-secondary-light"
                >
                  {{ day }}
                </DatePickerHeadCell>
              </DatePickerGridRow>
            </DatePickerGridHead>

            <DatePickerGridBody>
              <DatePickerGridRow
                v-for="(week, weekIdx) in month.rows"
                :key="weekIdx"
                class="flex"
              >
                <DatePickerCell v-for="date in week" :key="date.toString()" :date="date" class="p-0">
                  <DatePickerCellTrigger
                    :day="date"
                    :month="month.value"
                    class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-sm text-base-text transition-colors hover:bg-zen-primary/10 hover:text-zen-primary focus:outline-none focus:ring-1 focus:ring-zen-primary data-selected:bg-zen-primary data-selected:font-medium data-selected:text-white data-today:border data-today:border-zen-primary data-outside-view:opacity-40 data-disabled:cursor-not-allowed data-disabled:opacity-30 data-unavailable:line-through"
                  />
                </DatePickerCell>
              </DatePickerGridRow>
            </DatePickerGridBody>
          </DatePickerGrid>
        </DatePickerCalendar>
      </DatePickerContent>
    </DatePickerRoot>

    <p v-if="errorMessage" class="text-xs text-zen-error">{{ errorMessage }}</p>
  </div>
</template>
