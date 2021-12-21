<template>
  <div style="height: 80px"></div>
  <div
    class="layout-multiple-header"
    :style="`width: calc(100% - ${appStore.collapsed ? '48' : '210'}px)`"
  >
    <a-layout-header>
      <div class="layout-header-left">
        <LayoutTrigger></LayoutTrigger>
        <Breadcrumb></Breadcrumb>
      </div>
      <div class="layout-header-right">右边</div>
    </a-layout-header>
    <MultipleTabs></MultipleTabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutHeader'
})
</script>

<script setup lang="ts">
import LayoutTrigger from '@/layouts/trigger/index.vue'
import MultipleTabs from '@/layouts/tabs/index.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
</script>

<style lang="less" scoped>
.layout-multiple-header {
  position: fixed;
  z-index: @layout-max-fixed-z-index;
  top: 0;
  right: 0;
  .layout-width-transition();
}
.layout-header-left {
  display: flex;
}
.layout-header-right {
  display: flex;
}
.ant-layout-header {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 0;
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
