import { defineStore } from 'pinia'
import { useToggle, useStorage } from '@vueuse/core'

export const useAppStore = defineStore('app', () => {
  const collapsed = useStorage('collapsed', false)
  const triggerCollapsed = useToggle(collapsed)

  return { collapsed, triggerCollapsed }
})
