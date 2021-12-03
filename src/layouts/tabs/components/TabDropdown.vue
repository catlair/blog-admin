<template>
  <a-dropdown :trigger="['click']">
    <span class="ant-dropdown-link" @click.prevent>
      <span>
        <Icon icon="ion:chevron-down" />
      </span>
    </span>
    <template #overlay>
      <a-menu @click="clickHandle">
        <template v-for="item in dropMenuList" :key="`${item.event}`">
          <a-menu-item :disabled="item.disabled">
            <Icon :icon="item.icon"></Icon>
            {{ item.text }}
            <a-menu-divider v-if="item.divider" />
          </a-menu-item>
        </template>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { DropMenu, MenuEventEnum } from './types'
import { Icon } from '@/components/Icon'

const dropMenuList: DropMenu[] = [
  {
    icon: 'ion:reload-sharp',
    event: MenuEventEnum.REFRESH_PAGE,
    text: '刷新页面',
    disabled: true
  },
  {
    icon: 'clarity:close-line',
    event: MenuEventEnum.CLOSE_CURRENT,
    text: '关闭',
    disabled: false,
    divider: true
  },
  {
    icon: 'line-md:arrow-close-left',
    event: MenuEventEnum.CLOSE_LEFT,
    text: '关闭左侧',
    disabled: false,
    divider: false
  },
  {
    icon: 'line-md:arrow-close-right',
    event: MenuEventEnum.CLOSE_RIGHT,
    text: '关闭右侧',
    disabled: false,
    divider: true
  },
  {
    icon: 'dashicons:align-center',
    event: MenuEventEnum.CLOSE_OTHER,
    text: '关闭其他',
    disabled: false
  },
  {
    icon: 'clarity:minus-line',
    event: MenuEventEnum.CLOSE_ALL,
    text: '关闭全部',
    disabled: false
  }
]

const clickHandle = (e: { key: string }) => {
  console.log(e)
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TabDropdown'
})
</script>
