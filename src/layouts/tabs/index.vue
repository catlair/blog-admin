<template>
  <div class="multiple-tabs">
    <a-tabs
      v-model:activeKey="menuOrTabKey.selected[0]"
      hide-add
      size="small"
      :tabBarGutter="3"
      type="editable-card"
      @change="handleChange"
      @edit="onEdit"
    >
      <a-tab-pane
        v-for="pane in panes"
        :closable="!pane?.meta?.affix"
        :key="pane.fullPath"
        :tab="pane.meta.title"
      >
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const { menuOrTabKey } = useAppStore()

const panes = ref<any[]>([
  { fullPath: '/dashboard/analysis', meta: { affix: true, title: '分析页' } }
])

const remove = (targetKey: string) => {
  console.log(targetKey)
}

const onEdit = (targetKey: string) => {
  remove(targetKey)
}

const handleChange = (targetKey: string) => {
  router.push(targetKey)
}
const route = useRoute()
// 监听路由变化
watchEffect(() => {
  const { fullPath, params, path, query, meta } = route
  const pane = panes.value.find((pane) => pane.fullPath === fullPath)
  if (!pane) {
    panes.value.push({ fullPath, params, path, query, meta })
    menuOrTabKey.selected[0] = fullPath
  } else {
    menuOrTabKey.selected[0] = pane.fullPath
  }
})
</script>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'

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
    .ant-tabs-card-bar {
      height: 30px;
      margin: 0;
      background-color: #fff;
      border: 0;
      box-shadow: none;

      .ant-tabs-nav-container {
        height: 30px;
        padding-top: 2px;
      }

      .ant-tabs-nav {
        font-size: 12px;

        div:nth-child(1) {
          padding: 0 6px;

          .ant-tabs-tab {
            margin-right: 3px !important;
          }
        }
      }

      .ant-tabs-tab {
        height: calc(30px - 2px);
        padding: 0 0 0 8px;
        line-height: calc(30px - 2px);
        color: rgba(0, 0, 0, 0.85);
        background-color: #fff;
        transition: none;

        > div {
          display: inline-flex;
          align-items: center;
          padding: 0 0 0 4px;
        }
      }

      .ant-tabs-tab-active {
        position: relative;
        color: #fff !important;
        background: #0960bd;

        .ant-tabs-close-x {
          opacity: 1;

          svg {
            fill: #fff;
          }
        }
      }

      .ant-tabs-close-x {
        width: 8px;
        height: 12px;
        font-size: 12px;
        color: inherit;
        opacity: 0%;
        transition: none;

        svg {
          width: 0.7em;
        }

        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
