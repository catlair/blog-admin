import { ErrorMessageMode } from '#/axios'
import { UserInfo } from '#/store'
import { LoginParams } from '@/api/sys/model/userModel'
import { getUserApi, loginApi } from '@/api/sys/user'
import { PageEnum } from '@/enums/pageEnum'
import router from '@/router'
import { defineStore } from 'pinia'
import { RemovableRef, useStorage } from '@vueuse/core'
import { message } from 'ant-design-vue/es'
import { usePermissionStore } from './permission'
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes'

interface UserState {
  userInfo: RemovableRef<UserInfo>
  token: RemovableRef<string>
}

export const useUserStore = defineStore('app-user', {
  state: (): UserState => {
    // 这里初始值不能使用 null, 否则会存储成 '[object Object]', 导致后续操作时会失败
    const userInfo = useStorage('user-info', {} as UserInfo)
    const token = useStorage('token', '')

    return {
      userInfo,
      token
    }
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''
    },
    async login(
      params: LoginParams & {
        goHome?: boolean
        mode?: ErrorMessageMode
      }
    ) {
      try {
        const { goHome = true, mode, ...loginParams } = params
        const { access_token } = await loginApi(loginParams, mode)
        this.setToken(access_token)

        return await this.afterLoginAction()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLoginAction() {
      await this.getUserInfoAction()
      message.success('登录成功')
      const permissionStore = usePermissionStore()
      if (!permissionStore.isDynamicAddedRoute) {
        const routes = await permissionStore.buildRoutesAction()
        routes.forEach((route) => router.addRoute(route))
        router.addRoute(PAGE_NOT_FOUND_ROUTE)
        permissionStore.setDynamicAddedRoute(true)
      }
      router.push(PageEnum.BASE_HOME)
    },
    async getUserInfoAction() {
      try {
        if (!this.token) return null
        const userInfo = await getUserApi()
        this.userInfo = userInfo || {}
      } catch (error) {}
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info || {}
    },
    resetState() {
      this.userInfo = {} as UserInfo
      this.token = ''
    },
    logout(goLogin = false) {
      this.setToken('')
      goLogin && router.push(PageEnum.BASE_LOGIN)
    }
  }
})
