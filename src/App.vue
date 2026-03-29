<script setup lang="ts">
import { RouterView } from 'vue-router'
import { TooltipProvider } from 'radix-vue'
import { useThemeStore } from '@/stores/theme'

// Inicializa o store para aplicar o tema imediatamente via watcher interno
useThemeStore()
</script>

<template>
  <TooltipProvider :delay-duration="400">
    <RouterView />
  </TooltipProvider>
</template>
