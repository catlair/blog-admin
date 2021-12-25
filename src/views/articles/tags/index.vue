<template>
  <a-table bordered :loading="loading" :data-source="dataSource" :columns="columns">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'operation'">
        <a-popconfirm v-if="dataSource.length" title="确认删除？" @confirm="onDelete(record.key)">
          <a-button size="small" danger ghost>删除</a-button>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
import { columns } from './options'
import { useDataSource } from '@/hooks/useDataSource'
import { DataItem, getData } from './helper'

export default defineComponent({
  components: {
    CheckOutlined,
    EditOutlined
  },
  setup() {
    const { loading, dataSource, onActivatedForDataSource } = useDataSource<DataItem[]>()

    const onDelete = (key: string) => {
      dataSource.value = dataSource.value.filter((item) => item.key !== key)
    }

    onActivatedForDataSource(async () => {
      return getData(dataSource, loading)
    })

    return {
      columns,
      onDelete,
      dataSource,
      loading
    }
  }
})
</script>

<style>
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>
