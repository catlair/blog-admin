import { ListModel } from '../common/models'

export interface CreateArticleParms {
  title: string
  content: string
  category: string
  tags: string[]
  status?: number
  visibility?: number
  isTop?: boolean
}

export interface ArticleListModel {
  _id: string
  isTop: boolean
  status: number
  visibility: number
  tags: string[]
  category: string
  author: string
  content: string
  title: string
  createdAt: string
  updatedAt: string
}

export interface ArticleModel extends ListModel {
  list: ArticleListModel[]
}
