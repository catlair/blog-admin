import { ErrorMessageMode } from '#/axios'
import { defHttp } from '@/utils/http/axios'

enum Api {
  URL = '/article'
}

/**
 * @description: 创建文章
 */
export function createArticleApi(data: CreateArticleParms, mode?: ErrorMessageMode) {
  return defHttp.post(
    { url: Api.URL, data },
    {
      errorMessageMode: mode || 'message'
    }
  )
}

/**
 * @description: 获取文章列表
 */
export function getAllArticleApi(params) {
  return defHttp.get({ url: Api.URL, params })
}

/**
 * @description: 获取文章内容
 */
export function getContextArticleApi(id: string, params) {
  return defHttp.get({ url: Api.URL + '/' + id, params })
}

/**
 * @description: 更新文章
 */
export function updateArticleApi(id: string, data, mode?: ErrorMessageMode) {
  return defHttp.patch(
    { url: Api.URL + '/' + id, data },
    {
      errorMessageMode: mode || 'message'
    }
  )
}

/**
 * @description: 创建文章
 */
export function deleteArticleApi(id: string, data, mode?: ErrorMessageMode) {
  return defHttp.delete(
    { url: Api.URL + '/' + id, data },
    {
      errorMessageMode: mode || 'message'
    }
  )
}
