<script setup lang="ts">
export interface ButtonGroupOption {
  label: string
  value: string
}

interface Props {
  modelValue: string
  options: ButtonGroupOption[]
}

defineProps<Props>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="flex gap-2">
    <button
      v-for="option in options"
      :key="option.value"
      :class="[
        'h-9 cursor-pointer rounded-md px-4 text-sm font-medium transition-colors duration-150',
        modelValue === option.value
          ? 'bg-zen-primary text-white'
          : 'border border-base-border text-zen-secondary hover:bg-base-bg',
      ]"
      @click="emit('update:modelValue', option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
