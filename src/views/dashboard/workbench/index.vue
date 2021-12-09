<template>
  workbench
  <Icon icon="ic:baseline-article" size="38"></Icon>
  <a-button @click="execute">点击请求数据</a-button>
  <div>data: {{ data }}</div>
  <div>error: {{ error }}</div>
</template>

<script setup lang="ts">
import { Icon } from '@/components/Icon'
import { useFetch } from '@vueuse/core'

const { error, data, execute } = useFetch('http://localhost:3100/basic-api/user', {
  immediate: false,
  initialData: { data: 'initialData' }
}).json()
</script>

<style lang="" scoped></style>
