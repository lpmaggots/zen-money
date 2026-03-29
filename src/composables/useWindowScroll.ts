import { ref, onMounted, onUnmounted } from 'vue'

export const useWindowScroll = () => {
  const scrollY = ref(window.scrollY)

  const onScroll = (): void => {
    scrollY.value = window.scrollY
  }

  onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
  onUnmounted(() => window.removeEventListener('scroll', onScroll))

  return { scrollY }
}
