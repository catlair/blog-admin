import { filter } from '@/router/helper'
import { asyncRoutes } from '@/router/routes'
import { defineStore } from 'pinia'
import { toRaw } from 'vue'
import { RouteMeta, RouteRecordRaw } from 'vue-router'
import { useUserStore } from './user'

type Menu = Omit<RouteRecordRaw, 'meta'> & { meta: RouteMeta }

interface PermissionState {
  // 路由是否被动态添加过
  isDynamicAddedRoute: boolean
  menuList: Menu[]
}

export const usePermissionStore = defineStore('app-permission', {
  state: (): PermissionState => {
    return {
      isDynamicAddedRoute: false,
      menuList: []
    }
  },
  actions: {
    setMenuList(list) {
      this.menuList = list
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    resetState(): void {
      this.isDynamicAddedRoute = false
    },
    async buildRoutesAction() {
      const userStore = useUserStore()

      let routes: RouteRecordRaw[] = []
      const roleList = toRaw(userStore.userInfo?.roles) || []

      const routeFilter = (route: RouteRecordRaw) => {
        const { meta } = route
        const { roles } = meta || {}
        if (!roles) return true
        return roleList.some((role) => roles.includes(role))
      }
      routes = filter(asyncRoutes, routeFilter)
      routes = routes.filter(routeFilter)

      await this.buildMenuAction(routes)
      return routes
    },
    async buildMenuAction(routes: RouteRecordRaw[]) {
      const menuFilter = (route: RouteRecordRaw) => {
        return !route.meta?.hideMenu
      }
      const menuList = filter(routes, menuFilter).sort(
        (a, b) => (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0)
      )
      this.setMenuList(menuList)
      return this.menuList
    }
  }
})
