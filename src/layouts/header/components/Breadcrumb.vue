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
import { getParentPath } from '@/utils'
import { asyncRoutes } from '@/router/routes'

const $route = useRoute()

const routes = ref<any[]>([])

watchEffect(() => {
  routes.value = []
  const currentActiveMenu = getParentPath($route.fullPath)
  const parent = asyncRoutes.find((route) => currentActiveMenu === route.path)

  if (parent) {
    parent.children = parent.children
      ? parent.children.filter((route) => route.meta && !route.meta.hideBreadcrumb)
      : []
    routes.value.push(parent)
    // parent.children?.find((child) => $route.fullPath.includes(child.path))
    const matched = $route.matched
    routes.value.push(matched[matched.length - 1])
  }
})
</script>

<style lang="less" scoped>
.ant-breadcrumb {
  display: flex;
  align-items: center;
}
</style>
