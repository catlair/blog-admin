import { ArticleListModel } from '@/api/model/articleModel'
import { getStatusLabel, getVisibilityLabel, statusLabel } from '@/enums/articleEnum'
import { formatDate } from '@/utils/dayjs'
import type { ColumnFilterItem, ColumnType } from 'ant-design-vue/es/table/interface'
import { Ref } from 'vue'
import { columns } from './options'
import { useArticleStore } from '@/store/article'

const { getTags, getCategories } = useArticleStore()

export type DateType = {
  key: string
  isTop: boolean
  status: string
  visibility: string
  tags: string[]
  category: string
  author: string
  content: string
  title: string
  createdAt: string
  updatedAt: string
}

export function dataFormat(dataSource: Ref<DateType[]>, list: ArticleListModel[]) {
  dataSource.value = list.map((article) => {
    const updatedAt = formatDate(article.updatedAt)
    const createdAt = formatDate(article.createdAt)
    const status = getStatusLabel(article.status)
    const visibility = getVisibilityLabel(article.visibility)

    return {
      ...article,
      key: article._id,
      updatedAt,
      createdAt,
      status,
      visibility
    }
  })
}

export function getColumnsSourceFilters(dataSource: Ref<DateType[]>) {
  const statusSet = new Set<string>()
  const visibilitySet = new Set<string>()

  dataSource.value.map((item) => {
    statusSet.add(item.status)
    visibilitySet.add(item.visibility)
  })

  columns[3].filters = Array.from(statusSet).map((item) => {
    return { text: item, value: item } as ColumnFilterItem
  })
  columns[4].filters = Array.from(visibilitySet).map((item) => {
    return { text: item, value: item } as ColumnFilterItem
  })
}

// 是否被回收
export function isRecycle(data: DateType) {
  return data.status === statusLabel.DELETED
}

export function setColumnDataFilters(column: ColumnType | undefined, data: { name: string }[]) {
  return (
    column &&
    (column.filters = data.map((item) => ({
      text: item.name,
      value: item.name
    })) as unknown as ColumnFilterItem[])
  )
}

export const addFilters = async (dataSource: Ref<DateType[]>) => {
  getColumnsSourceFilters(dataSource)
  setColumnDataFilters(
    columns.find((item) => item.dataIndex === 'tags'),
    await getTags()
  )
  setColumnDataFilters(
    columns.find((item) => item.dataIndex === 'category'),
    await getCategories()
  )
}
