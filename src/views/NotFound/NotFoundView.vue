<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import Button from '@/components/common/Button.vue'

const router = useRouter()
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-6 bg-base-bg px-4 text-center">
    <span class="bg-linear-to-r from-zen-primary-light to-zen-primary bg-clip-text text-[10rem] font-bold leading-none text-transparent select-none">
      404
    </span>

    <div class="h-px w-24 bg-linear-to-r from-zen-primary-light to-zen-primary opacity-30" />

    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold text-base-text">Página não encontrada</h1>
      <p class="text-sm text-muted">A página que você buscou não existe ou foi removida.</p>
    </div>

    <Button variant="primary" size="md" @click="router.push('/')">
      <ArrowLeft :size="16" />
      Voltar ao início
    </Button>
  </div>
</template>
