<template>
  <RouterView>
    <template #default="{ Component, route }">
      <component v-if="route.meta.ignoreKeepAlive" :is="Component" :key="route.fullPath" />
      <keep-alive v-else>
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </template>
  </RouterView>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutPage'
})
</script>

<style lang="less" scoped></style>
