<template>
  <menu-unfold-outlined v-if="appStore.collapsed" class="trigger" @click="clickHandle" />
  <menu-fold-outlined v-else class="trigger" @click="clickHandle" />
</template>

<script lang="ts" setup>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()

const clickHandle = () => {
  appStore.triggerCollapsed()
}
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
