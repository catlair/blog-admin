<template>
  <div class="layout-multiple-header">
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
</script>

<style lang="less" scoped>
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
