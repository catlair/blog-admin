import { defineStore } from 'pinia'
import { useToggle } from '@vueuse/core'
import { asyncRoutes } from '@/router'

export const useAppStore = defineStore('app', () => {
  const [collapsed, triggerCollapsed] = useToggle(false)

  const routes = asyncRoutes

  return { collapsed, triggerCollapsed, routes }
})
