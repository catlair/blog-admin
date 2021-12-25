import { formatDate } from '@/utils/dayjs'
import { useArticleStore } from '@/store/article'
import type { Ref } from 'vue'

const { getCategories, reloadArticles } = useArticleStore()

export { reloadArticles }

export interface DataItem {
  key: string
  name: string
  num: number
  color: string
  createdAt: string
}

export async function getData(
  dataSource: Ref<DataItem[]>,
  loading: Ref<boolean>,
  reload: boolean = false
) {
  loading.value = true
  const data = await getCategories(reload)
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
