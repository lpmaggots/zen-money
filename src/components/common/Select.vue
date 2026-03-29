<script setup lang="ts">
import {
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radix-vue'
import { ChevronDown, ChevronUp, Check } from 'lucide-vue-next'

export interface SelectOption {
  value: string
  label: string
}

interface Props {
  modelValue?: string | null
  label?: string
  placeholder?: string
  options: SelectOption[]
  errorMessage?: string
  disabled?: boolean
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: '',
  placeholder: 'Selecione uma opção',
  errorMessage: '',
  disabled: false,
  required: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-sm font-medium text-base-text">
      {{ label }}
      <span v-if="required" class="text-zen-error ml-0.5">*</span>
    </label>

    <SelectRoot
      :model-value="modelValue ?? undefined"
      :disabled="disabled"
      @update:model-value="emit('update:modelValue', $event)"
    >
      <SelectTrigger
        :class="[
          'flex h-10 w-full items-center justify-between rounded-md border bg-base-card px-3 text-sm',
          'transition-colors duration-150 outline-none cursor-pointer',
          'focus:border-zen-primary focus:ring-1 focus:ring-zen-primary',
          'data-disabled:cursor-not-allowed data-disabled:opacity-50',
          errorMessage
            ? 'border-zen-error focus:border-zen-error focus:ring-zen-error'
            : 'border-base-border',
          !modelValue ? 'text-zen-secondary-light' : 'text-base-text',
        ]"
      >
        <SelectValue :placeholder="placeholder" />
        <ChevronDown class="h-4 w-4 shrink-0 text-zen-secondary-light" />
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
          position="popper"
          :side-offset="4"
          class="z-50 w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-base-border bg-base-card shadow-lg"
        >
          <SelectScrollUpButton class="flex cursor-default items-center justify-center py-1 text-zen-secondary-light">
            <ChevronUp class="h-4 w-4" />
          </SelectScrollUpButton>

          <SelectViewport class="p-1">
            <SelectItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              class="relative flex cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-3 text-sm text-base-text outline-none transition-colors duration-100 data-highlighted:bg-zen-primary/10 data-highlighted:text-zen-primary data-[state=checked]:font-medium data-disabled:pointer-events-none data-disabled:opacity-50"
            >
              <SelectItemIndicator class="absolute left-2 flex items-center justify-center">
                <Check class="h-4 w-4 text-zen-primary" />
              </SelectItemIndicator>
              <SelectItemText>{{ option.label }}</SelectItemText>
            </SelectItem>
          </SelectViewport>

          <SelectScrollDownButton class="flex cursor-default items-center justify-center py-1 text-zen-secondary-light">
            <ChevronDown class="h-4 w-4" />
          </SelectScrollDownButton>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>

    <p v-if="errorMessage" class="text-xs text-zen-error">{{ errorMessage }}</p>
  </div>
</template>
