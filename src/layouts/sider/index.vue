<template>
  <a-layout-sider width="210" collapsedWidth="48" :trigger="null" :collapsed="appStore.collapsed">
    <div
      :style="{
        height: '48px',
        background: '#001529',
        width: `${appStore.collapsed ? 48 : 210}px`,
        transition: 'all 0.2s'
      }"
    ></div>
    <a-menu
      v-model:openKeys="appStore.menuOrTabKey.opened"
      v-model:selectedKeys="appStore.menuOrTabKey.selected"
      mode="inline"
      theme="dark"
      @click="handleClick"
    >
      <LayoutSideBarMenu />
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutSider'
})
</script>

<script setup lang="ts">
import LayoutSideBarMenu from './components/Menu.vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
const router = useRouter()

function handleClick(e) {
  if (e.key !== appStore.menuOrTabKey.selected?.[0]) {
    router.push(e.key)
  }
}
</script>

<style lang="less" scoped>
.ant-menu-inline,
.ant-menu-inline-collapsed {
  min-height: calc(100% - 48px);
}
</style>
