import { ErrorMessageMode } from '#/axios'
import { defHttp } from '@/utils/http/axios'
import { TagModel } from './model/tagModel'

const ApiUrl = '/tag'

export function getTags(mode?: ErrorMessageMode) {
  return defHttp.get<TagModel[]>(
    {
      url: ApiUrl
    },
    { errorMessageMode: mode || 'message' }
  )
}
