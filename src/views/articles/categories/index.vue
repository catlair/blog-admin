<template>
  <a-table bordered :loading="loading" :data-source="dataSource" :columns="columns">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'name'">
        <div class="editable-cell">
          <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
            <a-input
              v-model:value="editableData[record.key].name"
              @pressEnter="saveName(record.key)"
            />
            <check-outlined class="editable-cell-icon-check" @click="saveName(record.key)" />
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
            <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
          </div>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'color'">
        <span style="display: inline-block; min-width: 12em">{{ text }}</span>
        <el-color-picker v-model="record.color" show-alpha />
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <a-space>
          <a-popconfirm
            v-if="dataSource.length"
            title="确认保存修改？"
            @confirm="saveHandle(record.key)"
          >
            <a-button type="primary" size="small" ghost>保存</a-button>
          </a-popconfirm>
          <a-popconfirm v-if="dataSource.length" title="确认删除？" @confirm="onDelete(record.key)">
            <a-button size="small" danger ghost>删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import type { UnwrapRef } from 'vue'
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
import { cloneDeep } from 'lodash-es'
import { columns } from './options'
import { DataItem, getData, reloadArticles } from './helper'
import { useDataSource } from '@/hooks/useDataSource'
import { updateCategory } from '@/api/category'

export default defineComponent({
  components: {
    CheckOutlined,
    EditOutlined
  },
  setup() {
    const { dataSource, loading, onActivatedForDataSource } = useDataSource<DataItem[]>()
    const editableData: UnwrapRef<Record<string, DataItem>> = reactive({})

    const edit = (key: string) => {
      editableData[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0])
    }
    const saveName = (key: string) => {
      Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData[key])
      delete editableData[key]
    }

    const onDelete = (key: string) => {
      dataSource.value = dataSource.value.filter((item) => item.key !== key)
    }

    const saveHandle = async (key: string) => {
      const item = dataSource.value.filter((item) => key === item.key)[0]
      await updateCategory(item.key, { name: item.name, color: item.color })
      await getData(dataSource, loading, true)
      reloadArticles()
    }

    onActivatedForDataSource(async () => {
      return getData(dataSource, loading)
    })

    return {
      columns,
      onDelete,
      dataSource,
      editableData,
      edit,
      saveName,
      loading,
      saveHandle
    }
  }
})
</script>

<style lang="less">
.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.el-color-picker__trigger {
  vertical-align: middle;
}
</style>
