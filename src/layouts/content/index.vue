<template>
  <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0 }">
    <PageLayout></PageLayout>
  </a-layout-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutSider'
})
</script>

<script setup lang="ts">
import PageLayout from '../page/index.vue'
</script>

<style lang="scss" scoped></style>
