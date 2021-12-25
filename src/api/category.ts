import { ErrorMessageMode } from '#/axios'
import { defHttp } from '@/utils/http/axios'
import { CategoryModel, UpdataModel } from './model/categoryModel'

const ApiUrl = '/category'

export function getCategories(mode?: ErrorMessageMode) {
  return defHttp.get<CategoryModel[]>(
    {
      url: ApiUrl
    },
    { errorMessageMode: mode || 'message' }
  )
}

export function updateCategory(key: string, data: UpdataModel, mode?: ErrorMessageMode) {
  return defHttp.patch(
    {
      url: ApiUrl + '/' + key,
      data
    },
    { errorMessageMode: mode || 'message' }
  )
}
