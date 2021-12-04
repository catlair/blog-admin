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
import { toRefs } from 'vue'
import { Icon } from '@/components/Icon'
import { useTab } from '@/hooks/useTab'

const props = defineProps<{ activeKey: string }>()
const { activeKey } = toRefs(props)
const { dropMenuList, dropMenuHandle } = useTab(activeKey)

const clickHandle = (e: { key: string }) => {
  dropMenuHandle(e.key)
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TabDropdown'
})
</script>
