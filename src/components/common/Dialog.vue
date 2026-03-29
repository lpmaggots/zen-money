<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { X } from 'lucide-vue-next'

interface Props {
  open: boolean
  title?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

withDefaults(defineProps<Props>(), {
  title: '',
  maxWidth: 'md',
})

const emit = defineEmits<{ close: [] }>()

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
}

const onKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="overlay" @click.self="emit('close')" />
    </Transition>

    <Transition name="slide-up">
      <div
        v-if="open"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        :class="[
          'fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 px-4',
          maxWidthClasses[maxWidth],
        ]"
      >
        <div class="card-surface p-6">
          <div v-if="title" class="mb-5 flex items-center justify-between">
            <h2 class="text-base font-semibold text-base-text">{{ title }}</h2>
            <button
              class="text-muted rounded-3xl p-1 transition-colors hover:bg-base-border focus-visible:outline-zen-primary cursor-pointer"
              aria-label="Fechar"
              @click="emit('close')"
            >
              <X :size="18" />
            </button>
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
