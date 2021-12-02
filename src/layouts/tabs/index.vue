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
    >
      <template v-for="pane in panes" :key="pane.fullPath">
        <a-tab-pane :closable="!pane?.meta?.affix" :tab="pane.meta.title"> </a-tab-pane>
      </template>
      <template #rightExtra>
        <a-button>{{ $route.fullPath }}</a-button>
      </template>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const go = useGo()

const panes = ref<any>([
  {
    fullPath: '/dashboard/analysis',
    meta: { title: '分析页', affix: true }
  }
])
const activeKey = ref()

const remove = (targetKey: string) => {
  let lastIndex = 0
  panes.value.forEach((pane, i) => {
    if (pane.fullPath === targetKey) {
      lastIndex = i - 1
    }
  })
  panes.value = panes.value.filter((pane) => pane.fullPath !== targetKey)
  if (panes.value.length && activeKey.value === targetKey) {
    if (lastIndex >= 0) {
      activeKey.value = panes.value[lastIndex].fullPath
    } else {
      activeKey.value = panes.value[0].fullPath
    }
    go(activeKey.value)
  }
}
const onEdit = (key: string) => {
  remove(key)
}
const onChange = (key: string) => {
  go(key)
}

const panesPush = (fullPath: string) => {
  const hasPane = panes.value.findIndex((pane) => pane.fullPath === fullPath)
  activeKey.value = fullPath
  if (hasPane !== -1) {
    return
  }
  const { meta, hash, query, matched } = route
  panes.value.push({ fullPath, meta, hash, query, matched })
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

      svg {
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
}
</style>
