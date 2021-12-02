<!-- 莫名其妙提示找不到变量，所以改用 tsx 了 -->
<script lang="tsx">
import { defineComponent, reactive, toRefs, watch } from 'vue'
import { Layout, Menu } from 'ant-design-vue/es'
import { useRoute } from 'vue-router'
import LayoutSideBarMenu from './components/Menu.vue'
import { useAppStore } from '@/store/app'
import { useGo } from '@/hooks/useRouter'
import { getParentPath } from '@/utils'

export default defineComponent({
  name: 'LayoutSider',
  setup() {
    const go = useGo()
    const route = useRoute()
    const firstFullPath = route.fullPath
    const appStore = useAppStore()
    const state = reactive({
      rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
      openKeys: [getParentPath(firstFullPath)],
      selectedKeys: [firstFullPath]
    })
    const handleClick = (e: { key: string }) => {
      go(e.key)
    }
    const handleOpenChange = (openKeys: any) => {
      const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1)
      state.openKeys = latestOpenKey ? [latestOpenKey] : []
    }

    watch(
      () => route.fullPath,
      (fullPath) => {
        state.selectedKeys = [fullPath]
        if (!appStore.collapsed) {
          state.openKeys = [getParentPath(fullPath)]
        }
      }
    )
    // 还原菜单
    watch(
      () => appStore.collapsed,
      (collapsed) => {
        if (!collapsed) {
          state.openKeys = [getParentPath(route.fullPath)]
        }
      }
    )
    return {
      ...toRefs(state),
      handleClick,
      handleOpenChange,
      appStore
    }
  },
  render() {
    return (
      <Layout.Sider
        width="210"
        collapsedWidth="48"
        trigger={null}
        collapsed={this.appStore.collapsed}
      >
        <div
          style={{
            height: '48px',
            background: '#001529',
            width: `${this.appStore.collapsed ? 48 : 210}px`,
            transition: 'all 0.2s'
          }}
        ></div>
        <Menu
          openKeys={this.openKeys}
          v-model:selectedKeys={this.selectedKeys}
          mode="inline"
          theme="dark"
          onClick={this.handleClick}
          onOpenChange={this.handleOpenChange}
        >
          <LayoutSideBarMenu />
        </Menu>
      </Layout.Sider>
    )
  }
})
</script>

<style lang="less" scoped>
.ant-menu-inline,
.ant-menu-inline-collapsed {
  min-height: calc(100% - 48px);
}
</style>
