<template>
  <div class="multiple-tabs">
    <a-tabs
      v-model:activeKey="activeKey"
      hide-add
      size="small"
      :tabBarGutter="3"
      @edit="onEdit"
      @change="onChange"
      type="editable-card"
      ref="aTabsRef"
    >
      <template v-for="pane in state.tabList" :key="pane.fullPath">
        <a-tab-pane :closable="!pane?.meta?.affix" :tab="pane.meta.title"> </a-tab-pane>
      </template>
      <template #rightExtra> <TabDeDropdown :activeKey="activeKey" /> </template>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import TabDeDropdown from './components/TabDropdown.vue'
import { SortableEvent, useSortableOnMount } from '@/hooks/useSortable'
import { useTabStore } from '@/store/tabs'
import { useTab } from '@/hooks/useTab'

const { state, closeTabByKey, addTab, moveTab } = useTabStore()
const route = useRoute()
const go = useGo()

const activeKey = ref(state.affixPath)
const aTabsRef = ref<HTMLElement | null>(null)

const { goToTab } = useTab(activeKey)
useSortableOnMount(aTabsRef, {
  animation: 150,
  level: 3,
  onUpdate({ oldIndex, newIndex }: SortableEvent) {
    moveTab(oldIndex!, newIndex!)
  }
})

const remove = (targetKey: string) => {
  goToTab(closeTabByKey(targetKey) - 1, targetKey)
}
const onEdit = (key: string) => {
  remove(key)
}
const onChange = (key: string) => {
  go(key, true)
}

const panesPush = (fullPath: string) => {
  const hasPane = state.tabList.findIndex((pane) => pane.fullPath === fullPath)
  activeKey.value = fullPath
  if (hasPane !== -1) {
    return
  }
  addTab({ ...route })
}

watch(
  () => route.fullPath,
  (fullPath) => {
    panesPush(fullPath)
  }
)

onMounted(() => {
  panesPush(route.fullPath)
})
</script>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useGo } from '@/hooks/useRouter'

export default defineComponent({
  name: 'MultipleTabs'
})
</script>

<style lang="less">
.multiple-tabs {
  z-index: 10;
  height: 32px;
  line-height: 32px;
  background-color: #fff;
  border-bottom: 1px solid #d9d9d9;

  .ant-tabs-tab:not(.ant-tabs-tab-active) {
    border: 1px solid #d9d9d9 !important;
  }

  .ant-tabs-small {
    height: 30px;
  }

  .ant-tabs-card {
    .ant-tabs-nav {
      padding-top: 2px;
      height: 30px;
      margin: 0;
      background-color: #fff;
      border: 0;
      box-shadow: none;

      .ant-tabs-nav-wrap svg {
        width: 0.7em;
        fill: #000000d9;
      }

      .ant-tabs-nav-wrap {
        padding: 0 6px;

        .ant-tabs-nav-list {
          div:first-child {
            padding-right: 6px;
          }
        }
        .ant-tabs-tab {
          padding: 6px 8px 6px 18px;
          margin-right: 3px !important;
          height: 28px;
          line-height: 28px;
          color: #000000d9;
          background-color: #fff;
          transition: none;
          border: 1px solid #d9d9d9 !important;

          &:not(.ant-tabs-tab-active):hover {
            color: #0960bd;
          }

          &:hover {
            .ant-tabs-tab-remove {
              opacity: 1;
            }
          }

          .ant-tabs-tab-btn {
            display: inline-block;
            width: 100%;
            height: 28px;
            padding-left: 0;
            margin-left: -10px;
            font-size: 12px;
            cursor: pointer;
            transition: none;
          }

          .ant-tabs-tab-remove {
            width: 8px;
            height: 28px;
            font-size: 12px;
            color: inherit;
            opacity: 0;
            transition: none;
            margin-left: 2px;
            margin-right: -4px;

            span {
              vertical-align: 0em !important;
            }
          }
        }

        .ant-tabs-tab-active {
          position: relative;
          background: #0960bd;
          border: 0;
          transition: none;

          &:hover {
            color: #fff !important;
          }

          .ant-tabs-tab-btn {
            color: #fff;
            text-shadow: 0 0 0.25px currentColor;
          }

          .ant-tabs-tab-remove {
            opacity: 1;

            span {
              color: #fff !important;
            }

            svg {
              width: 0.7em;
              fill: #fff;
            }
          }
        }
      }
    }
  }

  .ant-dropdown-trigger {
    display: inline-flex;
    margin-right: 10px;
    span {
      display: inline-block;
      width: 36px;
      height: 30px;
      line-height: 30px;
      color: #00000073;
      text-align: center;
      cursor: pointer;
      border-left: 1px solid #d9d9d9;

      &.iconify {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
