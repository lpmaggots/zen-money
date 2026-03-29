import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'zen-money-theme'

const getInitialDark = (): boolean => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored !== null) return stored === 'dark'
  return true
}

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(getInitialDark())

  const applyTheme = (dark: boolean): void => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
  }

  const toggleTheme = (): void => {
    isDark.value = !isDark.value
  }

  watch(isDark, applyTheme, { immediate: true })

  return { isDark, toggleTheme }
})
