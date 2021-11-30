<template>
  <menu-unfold-outlined
    v-if="appStore.collapsed"
    class="trigger"
    @click="appStore.triggerCollapsed"
  />
  <menu-fold-outlined v-else class="trigger" @click="appStore.triggerCollapsed" />
</template>

<script lang="ts" setup>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutTrigger'
})
</script>

<style lang="less" scoped>
.trigger {
  display: flex;
  align-items: center;
  margin: auto 16px;
  font-size: 16px;
  line-height: 48px;
  cursor: pointer;
}
</style>
