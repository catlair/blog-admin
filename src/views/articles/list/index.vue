<template>
  <a-table
    :columns="columns"
    :loading="loading"
    :data-source="dataSource"
    :pagination="pagination"
    @change="handleTableChange"
    bordered
  >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <a-space :size="10">
            <a-button size="small" type="primary" ghost @click="edit(record.key)">编辑</a-button>
            <a-button size="small" danger ghost>
              <a-popconfirm
                :title="isRecycle(record) ? '确定永久删除？' : '回收文章？'"
                @confirm="deleteHandle(record)"
                ><a>{{ isRecycle(record) ? '删除' : '回收' }}</a></a-popconfirm
              >
            </a-button>
          </a-space>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'title'">
        <div :style="record.isTop ? { color: '#f0932b' } : {}">
          {{ text }}
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'tags'">
        <span>
          <a-tag v-for="tag of record.tags" color="blue">
            {{ tag }}
          </a-tag>
        </span>
      </template>
      <template v-else>
        <div>
          {{ text }}
        </div>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import type { TablePaginationConfig } from 'ant-design-vue/es/table'
import { useArticleStore } from '@/store/article'
import { dataFormat, DateType, isRecycle, addFilters } from './helper'
import { useGo } from '@/hooks/useRouter'
import { columns } from './options'
import { useDataSource } from '@/hooks/useDataSource'
import { deleteArticleApi, recycleArticleApi } from '@/api/article'

const { getArticles } = useArticleStore()

export default defineComponent({
  setup() {
    const go = useGo()
    const { dataSource, loading, onActivatedForDataSource } = useDataSource<DateType[]>()

    // total 是服务端处理时需要的，前端处理时设置了，filter 后 total 不变会出 bug
    const pagination = reactive<TablePaginationConfig>({
      // total: 0,
      current: 1,
      pageSize: 10,
      pageSizeOptions: ['5', '10', '20', '50'],
      showSizeChanger: true,
      onShowSizeChange: (_current, pageSize: number) => {
        pagination.pageSize = pageSize
      }
    })

    const edit = (key: DateType) => {
      go('/articles/edit/' + key)
    }

    const deleteHandle = async (record: DateType) => {
      isRecycle(record) ? await deleteArticleApi(record.key) : await recycleArticleApi(record.key)
      loading.value = true
      getData(true)
      loading.value = false
    }

    const handleTableChange = (page) => {
      pagination.current = page.current
    }

    const getData = async (reLoad = false) => {
      const { list, curPage } = await getArticles(reLoad)
      // pagination.total = total
      pagination.current = curPage
      dataFormat(dataSource, list)
      addFilters(dataSource)
    }

    onActivatedForDataSource(getData)

    return {
      dataSource,
      columns,
      pagination,
      loading,
      edit,
      deleteHandle,
      handleTableChange,
      isRecycle
    }
  }
})
</script>
