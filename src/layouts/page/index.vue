<template>
  <RouterView>
    <template #default="{ Component, route }">
      <component :is="Component" :key="route.fullPath" />
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
