<template>
  <a-config-provider :locale="zh_CN">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
// 默认是英文，配置为中文
import zh_CN from 'ant-design-vue/es/locale/zh_CN'
</script>

<style>
#app {
  height: 100%;
  width: 100%;
}
</style>
