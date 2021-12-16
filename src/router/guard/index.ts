import { AxiosCanceler } from '@/utils/http/axios/axiosCancel'
import { Modal, notification } from 'ant-design-vue'
import { Router } from 'vue-router'
import { createPermissionGuard } from './permissionGuard'

export function setupRouterGuard(router: Router) {
  createPageGuard(router)
  createHttpGuard(router)
  createMessageGuard(router)
  createPermissionGuard(router)
}

/**
 * 创建页面路由守卫
 */
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>()

  router.beforeEach(async (to) => {
    // 页面已经加载过了
    to.meta.loaded = !!loadedPageMap.get(to.path)

    return true
  })

  router.afterEach(async (to) => {
    loadedPageMap.set(to.path, true)
  })
}

/**
 * 切换页面时，取消请求
 */
function createHttpGuard(router: Router) {
  const axiosCanceler = new AxiosCanceler()

  router.beforeEach(() => {
    axiosCanceler?.removeAllPending()
    return true
  })
}

/**
 * 切换路由时，销毁消息提示
 * @param router
 */
export function createMessageGuard(router: Router) {
  router.beforeEach(async () => {
    try {
      Modal.destroyAll()
      notification.destroy()
    } catch (error) {
      console.error(error)
    }
    return true
  })
}
