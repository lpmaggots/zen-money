<script setup lang="ts">
import {
  TooltipRoot,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
} from 'radix-vue'

interface Props {
  label: string
  variant?: 'ghost' | 'secondary' | 'danger'
  size?: 'sm' | 'md'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  tooltipSide?: 'top' | 'bottom' | 'left' | 'right'
}

withDefaults(defineProps<Props>(), {
  variant: 'ghost',
  size: 'sm',
  type: 'button',
  disabled: false,
  tooltipSide: 'top',
})

defineEmits<{ click: [event: MouseEvent] }>()

const variantClasses: Record<string, string> = {
  ghost: 'text-muted hover:bg-base-border focus-visible:outline-zen-secondary',
  secondary: 'text-zen-secondary border border-base-border hover:bg-base-bg focus-visible:outline-zen-secondary',
  danger: 'text-zen-error hover:bg-zen-error/10 focus-visible:outline-zen-error',
}

const sizeClasses: Record<string, string> = {
  sm: 'p-1',
  md: 'p-2',
}
</script>

<template>
  <TooltipRoot>
    <TooltipTrigger as-child>
      <button
        :type="type"
        :aria-label="label"
        :disabled="disabled"
        :class="[
          'inline-flex cursor-pointer items-center justify-center rounded-full transition-colors duration-150',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          variantClasses[variant],
          sizeClasses[size],
        ]"
        @click="$emit('click', $event)"
      >
        <slot />
      </button>
    </TooltipTrigger>

    <TooltipPortal>
      <TooltipContent
        :side="tooltipSide"
        :side-offset="6"
        class="z-50 rounded-md bg-zen-secondary-dark px-2.5 py-1.5 text-xs font-medium text-white shadow-md"
      >
        {{ label }}
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>
