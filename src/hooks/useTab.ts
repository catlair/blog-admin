import { DropMenu, MenuEventEnum } from '@/layouts/tabs/components/types'
import { ComputedRef, Ref, computed } from 'vue'
import { useGo } from './useRouter'
import { useTabStore } from '@/store/tabs'

export function useTab(activeKey: Ref<string>) {
  const { state, closeTabByKey, bulkCloseTabs } = useTabStore()
  const go = useGo()

  const currIndex = computed(() =>
    state.tabList.findIndex((tab) => tab.fullPath === activeKey.value)
  )
  const isAffixTab = (index) => state.tabList[index].fullPath === state.affixPath
  const tabLength = computed(() => state.tabList.length)
  const closeCurrentDisabled = computed(() => activeKey.value === state.affixPath)
  const closeLeftDisabled = computed(
    () => currIndex.value < 1 || (currIndex.value === 1 && isAffixTab(0))
  )
  const closeRightDisabled = computed(
    () =>
      currIndex.value >= tabLength.value - 1 ||
      (currIndex.value === tabLength.value - 2 && isAffixTab(tabLength.value - 1))
  )
  const closeOtherDisabled = computed(
    () => tabLength.value <= 1 || (tabLength.value === 2 && activeKey.value !== state.affixPath)
  )
  const closeAllDisabled = computed(() => tabLength.value <= 1)

  const dropMenuList: ComputedRef<DropMenu[]> = computed(() => [
    {
      icon: 'ion:reload-sharp',
      event: MenuEventEnum.REFRESH_PAGE,
      text: '刷新页面',
      disabled: true
    },
    {
      icon: 'clarity:close-line',
      event: MenuEventEnum.CLOSE_CURRENT,
      text: '关闭',
      disabled: closeCurrentDisabled.value,
      divider: true
    },
    {
      icon: 'line-md:arrow-close-left',
      event: MenuEventEnum.CLOSE_LEFT,
      text: '关闭左侧',
      disabled: closeLeftDisabled.value,
      divider: false
    },
    {
      icon: 'line-md:arrow-close-right',
      event: MenuEventEnum.CLOSE_RIGHT,
      text: '关闭右侧',
      disabled: closeRightDisabled.value,
      divider: true
    },
    {
      icon: 'dashicons:align-center',
      event: MenuEventEnum.CLOSE_OTHER,
      text: '关闭其他',
      disabled: closeOtherDisabled.value
    },
    {
      icon: 'clarity:minus-line',
      event: MenuEventEnum.CLOSE_ALL,
      text: '关闭全部',
      disabled: closeAllDisabled.value
    }
  ])

  /**
   * 根据 tab index 跳转路由
   * @param index 跳转的 tab index
   * @param deleteKey 跳转前被删除的 tab key
   */
  function goToTab(index: number, deleteKey?: string) {
    if (!deleteKey) {
      go(state.tabList[index].fullPath, true)
      return
    }
    // 如果不是关闭当前页面，则无需跳转
    if (activeKey.value !== deleteKey) {
      return
    }
    if (tabLength.value > 0) {
      go(state.tabList[index > 0 ? index : 0].fullPath, true)
    }
  }

  // ----------
  // 关闭事件
  // ----------
  function closeCurrentTab() {
    goToTab(closeTabByKey(activeKey.value) - 1)
  }

  function closeLeftTabs() {
    state.tabList = state.tabList.filter((tab, i) => i >= currIndex.value || tab.meta.affix)
  }

  function closeRightTabs() {
    state.tabList = state.tabList.filter((tab, i) => i <= currIndex.value || tab.meta.affix)
  }

  function closeOtherTabs() {
    bulkCloseTabs([activeKey.value, state.affixPath])
  }

  function closeAllTabs() {
    bulkCloseTabs([state.affixPath])
    goToTab(0)
  }

  /**
   * tabs 管理菜单 click handler
   * @param key 事件枚举值
   */
  function dropMenuHandle(key: number | string) {
    switch (Number(key)) {
      case MenuEventEnum.CLOSE_CURRENT:
        closeCurrentTab()
        break
      case MenuEventEnum.CLOSE_LEFT:
        closeLeftTabs()
        break
      case MenuEventEnum.CLOSE_RIGHT:
        closeRightTabs()
        break
      case MenuEventEnum.CLOSE_OTHER:
        closeOtherTabs()
        break
      case MenuEventEnum.CLOSE_ALL:
        closeAllTabs()
        break
      default:
        break
    }
  }

  return { dropMenuList, dropMenuHandle, goToTab }
}
