import { isNumber } from '@/utils/is'

export enum ArticleStatusEnum {
  // 草稿
  'DRAFT',
  // 已发布
  'PUBLISHED',
  // 已删除
  'DELETED'
}

export const statusLabel = {
  DRAFT: '草稿',
  PUBLISHED: '已发布',
  DELETED: '已删除'
}

// 后端设计的问题，保存的数字，却要读取出汉字
export const getStatusLabel = (v: number | string): string => {
  if (isNumber(v)) {
    return statusLabel[ArticleStatusEnum[v]]
  } else {
    return statusLabel[v]
  }
}

export enum ArticleVisibilityEnum {
  // 公开
  'PUBLIC',
  // 评论可见
  'COMMENT',
  // 登录可见
  'LOGIN',
  // 私有
  'PRIVATE'
}

export const visibilityLabel = {
  PUBLIC: '公开',
  COMMENT: '评论可见',
  LOGIN: '登录可见',
  PRIVATE: '私有'
}

export const getVisibilityLabel = (v: number | string): string => {
  if (isNumber(v)) {
    return visibilityLabel[ArticleVisibilityEnum[v]]
  } else {
    return visibilityLabel[v]
  }
}
