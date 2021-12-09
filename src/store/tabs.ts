import { defineStore } from 'pinia'
import { unref } from 'vue'
import { RemovableRef, useStorage } from '@vueuse/core'
import { RouteLocationNormalized, RouteRecordNormalized, useRouter } from 'vue-router'
import { useGo } from '@/hooks/useRouter'

export interface MultipleTabState {
  tabList: RouteLocationNormalized[]
  affixPath: string
}
let routes: RouteRecordNormalized[] | undefined

export const useTabStore = defineStore('app-multiple-tab', () => {
  // 确保只获取一次路由
  if (!routes) {
    const router = useRouter()
    routes = unref(router.getRoutes())
  }

  const go = useGo()

  // 避免全局观察路由
  const affixTab = routes.find((route) => route.meta?.affix)!
  const state: RemovableRef<MultipleTabState> = useStorage('multiple-tab', {
    tabList: [
      {
        path: affixTab.path,
        fullPath: affixTab.path,
        meta: affixTab.meta,
        hash: '',
        query: {},
        params: {},
        name: affixTab.name,
        matched: [],
        redirectedFrom: undefined
      }
    ],
    affixPath: affixTab.path
  })

  /**
   * 添加一个新的 tab
   * @param tab 本地路由（可选）
   */
  const addTab = (tab: RouteLocationNormalized) => {
    // fuck you vue-tools router 你在哪里看到我监视了整个响应式路由树？
    // 这里有个傻逼警告，如果你不去点击 vue-tools 你不会看到这个警告
    state.value.tabList.push({ ...tab })
  }

  const closeTabByKey = (deletetKey: string) => {
    const lastIndex = state.value.tabList.findIndex((pane) => pane.fullPath === deletetKey)
    if (lastIndex !== -1) {
      state.value.tabList.splice(lastIndex, 1)
    }
    return lastIndex
  }

  /**
   * 移动 tab
   * @param index 要移动的 tab 的索引
   * @param newIndex 目标位置
   */
  const moveTab = (index: number, newIndex: number) => {
    state.value.tabList.splice(newIndex, 0, state.value.tabList.splice(index, 1)[0])
  }

  /**
   * 按照路径保留 tabs
   * @param pathList 要保留的路径列表
   */
  const bulkCloseTabs = async (pathList: string[], targetKey?: string) => {
    state.value.tabList = state.value.tabList.filter((item) => pathList.includes(item.fullPath))
    if (targetKey) {
      go(targetKey, true)
    } else if (pathList.length >= 1) {
      go(pathList[0], true)
    }
  }

  return {
    state,
    addTab,
    moveTab,
    bulkCloseTabs,
    closeTabByKey
  }
})
