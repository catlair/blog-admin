import { ErrorMessageMode } from '#/axios'
import { ArticleStatusEnum } from '@/enums/articleEnum'
import { defHttp } from '@/utils/http/axios'
import { PaginationParms } from './common/models'
import { ArticleListModel, ArticleModel, CreateArticleParms } from './model/articleModel'

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
export function getAllArticleApi(params?: PaginationParms) {
  return defHttp.get<ArticleModel>({ url: Api.URL, params })
}

/**
 * @description: 获取文章内容
 */
export function getArticleContextApi(id: string) {
  return defHttp.get<ArticleListModel>({ url: Api.URL + '/' + id })
}

/**
 * @description: 更新文章
 */
export function updateArticleApi(id: string, data: any, mode?: ErrorMessageMode) {
  return defHttp.patch(
    { url: Api.URL + '/' + id, data },
    {
      errorMessageMode: mode || 'message'
    }
  )
}

export function recycleArticleApi(id: string) {
  return updateArticleApi(id, { status: ArticleStatusEnum.DELETED })
}

/**
 * @description: 创建文章
 */
export function deleteArticleApi(id: string, mode?: ErrorMessageMode) {
  return defHttp.delete(
    { url: Api.URL + '/' + id },
    {
      errorMessageMode: mode || 'message'
    }
  )
}
