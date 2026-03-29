<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  loading: false,
  disabled: false,
  fullWidth: false,
})

defineEmits<{ click: [event: MouseEvent] }>()

const baseClasses =
  'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

const variantClasses: Record<NonNullable<Props['variant']>, string> = {
  primary:
    'bg-zen-primary text-white hover:bg-zen-primary-dark focus-visible:outline-zen-primary',
  secondary:
    'bg-transparent text-zen-secondary border border-base-border hover:bg-base-bg focus-visible:outline-zen-secondary',
  danger:
    'bg-zen-error text-white hover:bg-zen-error-dark focus-visible:outline-zen-error',
  ghost:
    'bg-transparent text-zen-secondary hover:bg-base-border focus-visible:outline-zen-secondary',
}

const sizeClasses: Record<NonNullable<Props['size']>, string> = {
  xs: 'h-9 px-4 text-sm',
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-6 text-base',
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      fullWidth ? 'w-full' : '',
    ]"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    <slot />
  </button>
</template>
