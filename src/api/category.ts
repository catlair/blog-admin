import { ErrorMessageMode } from '#/axios'
import { defHttp } from '@/utils/http/axios'
import { CategoryModel } from './model/categoryModel'

const ApiUrl = '/category'

export function getCategories(mode?: ErrorMessageMode) {
  return defHttp.get<CategoryModel[]>(
    {
      url: ApiUrl
    },
    { errorMessageMode: mode || 'message' }
  )
}
