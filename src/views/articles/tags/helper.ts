import type { Ref } from 'vue'
import { useArticleStore } from '@/store/article'
import { formatDate } from '@/utils/dayjs'

const { getTags } = useArticleStore()

export interface DataItem {
  key: string
  name: string
  num: number
  createdAt: string
}

export async function getData(dataSource: Ref<DataItem[]>, loading: Ref<boolean>) {
  loading.value = true
  const data = await getTags()
  loading.value = false
  dataSource.value = data.map((category) => {
    const createdAt = formatDate(category.createdAt, 'YYYY-MM-DD')

    return {
      ...category,
      key: category._id,
      createdAt
    }
  })
}
