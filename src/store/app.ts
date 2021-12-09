import { defineStore } from 'pinia'
import { useToggle, useStorage } from '@vueuse/core'
import { asyncRoutes } from '@/router'

export const useAppStore = defineStore('app', () => {
  const collapsed = useStorage('collapsed', false)
  const triggerCollapsed = useToggle(collapsed)

  const routes = asyncRoutes

  return { collapsed, triggerCollapsed, routes }
})
