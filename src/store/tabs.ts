import { defineStore } from 'pinia'
import { RouteLocationNormalized } from 'vue-router'

export interface MultipleTabState {
  cacheTabs: Set<string>
  tabs: RouteLocationNormalized[]
  lastRemovedTabIndex: number
}

export const useTabStore = defineStore('app-multiple-tab', {})
