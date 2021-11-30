<template>
  <template v-for="route in routes">
    <template v-if="route.children?.length">
      <a-sub-menu :key="route.path">
        <template #icon>
          <Icon :icon="route.meta.icon"></Icon>
        </template>
        <template #title>{{ route.meta.title }}</template>
        <a-menu-item v-for="routeChild in route.children" :key="route.path + '/' + routeChild.path">
          {{ routeChild.meta.title }}
        </a-menu-item>
      </a-sub-menu>
    </template>
    <template v-else>
      <a-menu-item :key="route.path">
        <template #icon>
          <Icon :icon="route.meta.icon"></Icon>
        </template>
        <span>{{ route.meta.title }}</span>
      </a-menu-item>
    </template>
  </template>
</template>

<script setup lang="ts">
import { Icon } from '@/components/Icon'
import { useAppStore } from '@/store/app'

const { routes } = useAppStore()
</script>

<style lang="less" scoped></style>
