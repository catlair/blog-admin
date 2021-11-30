import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import { asyncRoutes } from '@/router'

export const useAppStore = defineStore('app', () => {
  const route = useRoute()

  const collapsed = ref(false)

  const menuOrTabKey = reactive({
    selected: [route.fullPath],
    opened: [route.fullPath.match(/(^\/\w*)\//)?.[1]]
  })

  const routes = asyncRoutes

  function triggerCollapsed() {
    collapsed.value = !collapsed.value
  }

  return { collapsed, triggerCollapsed, routes, menuOrTabKey }
})
