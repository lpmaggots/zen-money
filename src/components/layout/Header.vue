<script setup lang="ts">
import { computed } from 'vue'
import { Plus, Sun, Moon } from 'lucide-vue-next'
import logoUrl from '@/assets/images/zen-money-logo.webp'
import Button from '@/components/common/Button.vue'
import FabButton from '@/components/common/FabButton.vue'
import { useThemeStore } from '@/stores/theme'
import { useWindowScroll } from '@/composables/useWindowScroll'

interface Props {
  onNewTransaction: () => void
}

defineProps<Props>()

const themeStore = useThemeStore()

const { scrollY } = useWindowScroll()
const scrolled = computed(() => scrollY.value > 20)
</script>

<template>
  <div class="fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-in-out">
    <header
      :class="[
        'transition-all duration-300 ease-in-out',
        scrolled
          ? 'mx-auto border border-base-border/50 bg-base-card/70 shadow-card backdrop-blur-sm'
          : 'border-b border-base-border bg-base-card',
      ]"
    >
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div class="flex items-center gap-2">
          <img :src="logoUrl" alt="Zen Money" class="h-13 w-h-13 ml-2" width="52" height="52" />
          <span class="bg-linear-to-r from-zen-primary-light to-zen-success bg-clip-text text-xl font-bold text-transparent">
            zen_Money
          </span>
        </div>
        <div class="flex items-center gap-4">
          <Button variant="primary" size="xs" @click="onNewTransaction">
            <Plus :size="15" :stroke-width="2.5" />
            Nova Transação
          </Button>
          <FabButton
            :label="themeStore.isDark ? 'Modo claro' : 'Modo escuro'"
            variant="ghost"
            size="md"
            tooltip-side="bottom"
            @click="themeStore.toggleTheme()"
          >
            <Sun v-if="themeStore.isDark" :size="18" />
            <Moon v-else :size="18" />
          </FabButton>
        </div>
      </div>
    </header>
  </div>
  <!-- spacer -->
  <div class="w-full h-30"></div>
</template>
