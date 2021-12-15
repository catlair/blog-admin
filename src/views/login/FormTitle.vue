<template>
  <h2 class="mb-3 text-2xl font-bold xl:text-3xl xl:text-left enter-x">
    {{ fromStatus }}
  </h2>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { fromStatusKey } from './index.vue'

const fromStatus = inject(fromStatusKey)
</script>

<style lang="less" scoped></style>
