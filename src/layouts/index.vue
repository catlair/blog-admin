<template>
  <a-layout class="admin-layout">
    <LayoutSider></LayoutSider>
    <a-layout class="admin-main">
      <LayoutHeader></LayoutHeader>
      <LayoutContent></LayoutContent>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Layout'
})
</script>

<script lang="ts" setup>
import LayoutSider from '@/layouts/sider/index.vue'
import LayoutHeader from '@/layouts/header/index.vue'
import LayoutContent from '@/layouts/content/index.vue'
</script>

<style lang="less" scoped>
.admin-layout {
  min-height: 100%;

  > .ant-layout {
    min-height: 100%;
  }
}
</style>
