<template>
  <a-breadcrumb :routes="routes">
    <template #itemRender="{ route, paths, routes: routesMatched }">
      <span v-if="routesMatched.indexOf(route) === routesMatched.length - 1">
        {{ route.meta.title }}
      </span>
      <router-link v-else :to="`/${paths.join('/')}`">
        {{ route.meta.title }}
      </router-link>
    </template>
  </a-breadcrumb>
</template>

<script lang="ts">
import { watchEffect, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Breadcrumb'
})
</script>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
const $route = useRoute()

const routes = ref<any[]>([])

watchEffect(() => {
  routes.value = []
  const currentActiveMenu = $route.meta.currentActiveMenu

  const parent = appStore.routes.find((route) => currentActiveMenu === route.path)

  if (parent) {
    routes.value.push(parent)
    routes.value.push(parent.children.find((child) => $route.fullPath.includes(child.path)))
  }
})
</script>

<style lang="less" scoped>
.ant-breadcrumb {
  display: flex;
  align-items: center;
}
</style>
