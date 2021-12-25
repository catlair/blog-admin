import { sortTime } from '@/utils'
import type { ColumnType } from 'ant-design-vue/es/table'
import { DateType } from './helper'
import { SearchOutlined } from '@ant-design/icons-vue'
import { reactive, ref } from 'vue'
import { FilterSearchInput, filterSearchInputFoucs } from '@/components/Input'

const titleInput = ref<{ input: HTMLInputElement } | null>(null)

export const columns: ColumnType[] = reactive([
  {
    title: '标题',
    dataIndex: 'title',
    width: 200,
    sorter: (a: DateType) => (a.isTop ? -1 : 1),
    sortDirections: ['ascend'],
    filterDropdown: (arg) => FilterSearchInput(arg, titleInput),
    onFilter: (v: string, record: DateType) => record.title.toLowerCase().includes(v.toLowerCase()),
    filterIcon: () => <SearchOutlined />,
    onFilterDropdownVisibleChange: (visible: boolean) => filterSearchInputFoucs(visible, titleInput)
  },
  {
    title: '分类',
    dataIndex: 'category',
    width: 100,
    filters: [],
    onFilter: (value: string, record: DateType) => record.category.indexOf(value) === 0
  },
  {
    title: '标签',
    dataIndex: 'tags',
    filterMultiple: true,
    width: '16%',
    filters: [],
    onFilter: (value: string, record: DateType) => record.tags.includes(value)
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 76,
    filters: [],
    onFilter: (value: string, record: DateType) => record.status === value
  },
  {
    title: '可见性',
    dataIndex: 'visibility',
    width: 90,
    filters: [],
    onFilter: (value: string, record: DateType) => record.visibility === value
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 160,
    sorter: (a: DateType, b: DateType) => sortTime(a.updatedAt, b.updatedAt),
    defaultSortOrder: 'descend'
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 160,
    sorter: (a: DateType, b: DateType) => sortTime(a.createdAt, b.createdAt)
  },
  {
    title: '操作',
    dataIndex: 'operation',
    fixed: 'right',
    width: 120
  }
])
