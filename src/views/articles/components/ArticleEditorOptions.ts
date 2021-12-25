import { ArticleListModel } from '@/api/model/articleModel'
import {
  ArticleStatusEnum,
  ArticleVisibilityEnum,
  statusLabel,
  visibilityLabel
} from '@/enums/articleEnum'
import { getLabelOptions } from '@/utils/component'

export const visibilityOptions = getLabelOptions(ArticleVisibilityEnum, visibilityLabel)

export const statusOptions = getLabelOptions(ArticleStatusEnum, statusLabel)

export interface FormState {
  title: string
  content: string
  tags: string[]
  category: string
  visibility: string
  status: string
  isTop: boolean
}

export const initFormState: FormState = {
  title: '',
  content: '',
  tags: [],
  category: '',
  visibility: ArticleVisibilityEnum[0],
  status: ArticleStatusEnum[0],
  isTop: false
}

export const setFormState = (state: ArticleListModel): FormState => {
  return {
    ...state,
    visibility: ArticleVisibilityEnum[state.visibility],
    status: ArticleStatusEnum[state.status]
  }
}
