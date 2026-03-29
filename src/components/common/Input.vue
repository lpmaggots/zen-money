<script setup lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next'

interface Props {
  modelValue?: string | number | null
  label?: string
  placeholder?: string
  type?: string
  errorMessage?: string
  disabled?: boolean
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: '',
  placeholder: '',
  type: 'text',
  errorMessage: '',
  disabled: false,
  required: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const isFocused = ref(false)

const onInput = (event: Event): void => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const clearInput = (): void => {
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-sm font-medium text-base-text">
      {{ label }}
      <span v-if="required" class="text-zen-error ml-0.5">*</span>
    </label>

    <div class="relative">
      <input
        :value="modelValue ?? ''"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'h-10 w-full rounded-md border bg-base-card px-3 text-sm text-base-text placeholder:text-zen-secondary-light',
          'transition-colors duration-150 outline-none',
          'focus:border-zen-primary focus:ring-1 focus:ring-zen-primary',
          'disabled:cursor-not-allowed disabled:opacity-50',
          errorMessage
            ? 'border-zen-error focus:border-zen-error focus:ring-zen-error'
            : 'border-base-border',
          isFocused && modelValue ? 'pr-8' : '',
        ]"
        @input="onInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <button
        v-if="isFocused && modelValue"
        type="button"
        class="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer text-muted transition-colors hover:text-base-text"
        tabindex="-1"
        @mousedown.prevent="clearInput"
      >
        <X :size="14" />
      </button>
    </div>

    <p v-if="errorMessage" class="text-xs text-zen-error">{{ errorMessage }}</p>
  </div>
</template>
