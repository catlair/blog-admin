import { Router } from 'vue-router'
import { checkTokenApi } from '@/api/sys/user'
import { PageEnum } from '@/enums/pageEnum'
import { usePermissionStore } from '@/store/permission'
import { useUserStore } from '@/store/user'
import { PAGE_NOT_FOUND_ROUTE } from '../routes'

/**
 * 权限控制
 */
export function createPermissionGuard(router: Router) {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  const token = userStore.token
  // 简单的校验一下 token
  if (!token) {
    router.push('/login')
  } else {
    checkTokenApi().catch(() => {
      userStore.logout(true)
    })
  }

  router.beforeEach(async (to, from, next) => {
    const token = userStore.token

    if (to.path === PageEnum.BASE_LOGIN) {
      next()
      return
    }

    // 如果没有 token，跳转到登录页
    if (!token) {
      if (to.meta.ignoreAuth) {
        next()
        return
      }

      // 重定向
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: PageEnum.BASE_LOGIN,
        replace: true
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path
        }
      }
      next(redirectData)
      return
    }

    // 如果登录后跳转到 404
    if (from.path === PageEnum.BASE_LOGIN && to.path === PageEnum.BASE_404) {
      next(PageEnum.BASE_HOME)
      return
    }

    // 如果路由被动态加载过，则不再加载
    if (permissionStore.isDynamicAddedRoute) {
      next()
      return
    }

    // 如果路由没有被动态添加过，则动态添加
    const routes = await permissionStore.buildRoutesAction()
    routes.forEach((route) => router.addRoute(route))
    router.addRoute(PAGE_NOT_FOUND_ROUTE)
    permissionStore.setDynamicAddedRoute(true)

    // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      const redirectPath = (from.query.redirect || to.path) as string
      const redirect = decodeURIComponent(redirectPath)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      next(nextData)
    }
  })
}
