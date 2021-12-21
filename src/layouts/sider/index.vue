<!-- 莫名其妙提示找不到变量，所以改用 tsx 了 -->
<script lang="tsx">
import { defineComponent, reactive, toRefs, watch } from 'vue'
import { Layout, Menu } from 'ant-design-vue/es'
import { useRoute } from 'vue-router'
import LayoutSideBarMenu from './components/Menu.vue'
import { useAppStore } from '@/store/app'
import { useGo } from '@/hooks/useRouter'
import { getParentPath } from '@/utils'
import { Scrollbar } from '@/components/Scrollbar'

export default defineComponent({
  name: 'LayoutSider',
  components: {
    Scrollbar
  },
  setup() {
    const go = useGo()
    const route = useRoute()
    const firstFullPath = route.fullPath
    const appStore = useAppStore()
    const state = reactive({
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
          // 确保被打开的只有一个
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
      <>
        <div
          style={{
            /** 自闭了,使用计算属性或者直接三目运算都无效果,只能这样了 */
            width: `${this.appStore.collapsed ? 48 : 210}px`,
            overflow: 'hidden',
            flex: `0 0 ${this.appStore.collapsed ? 48 : 210}px`,
            maxWidth: `${this.appStore.collapsed ? 48 : 210}px`,
            minWidth: `${this.appStore.collapsed ? 48 : 210}px`
          }}
          class="layout-sider-div"
        ></div>
        <Layout.Sider
          width="210"
          collapsedWidth="48"
          trigger={null}
          collapsed={this.appStore.collapsed}
          class="admin-layout-sider"
        >
          <div
            style={{
              height: '48px',
              background: '#001529',
              width: `${this.appStore.collapsed ? 48 : 210}px`,
              transition: 'all 0.2s'
            }}
          ></div>
          <Scrollbar class="scroll-container" style="height: calc(100% - 48px);">
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
          </Scrollbar>
        </Layout.Sider>
      </>
    )
  }
})
</script>

<style lang="less" scoped>
.layout-sider-div {
  .layout-width-transition();
}
.admin-layout-sider {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: @layout-max-fixed-z-index;
}
.ant-menu-inline,
.ant-menu-inline-collapsed {
  min-height: calc(100% - 48px);
}

.scroll-container {
  width: 100%;
  height: 100%;

  .scrollbar__wrap {
    margin-bottom: 18px !important;
    overflow-x: hidden;
  }

  .scrollbar__view {
    box-sizing: border-box;
  }
}
</style>
