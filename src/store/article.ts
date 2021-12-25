import { defineStore } from 'pinia'
import { getTags } from '@/api/tag'
import { TagModel } from '@/api/model/tagModel'
import { CategoryModel } from '@/api/model/categoryModel'
import { ArticleModel } from '@/api/model/articleModel'
import { getCategories } from '@/api/category'
import { getAllArticleApi } from '@/api/article'

interface ArticleState {
  // 标签
  tags: TagModel[]
  // 分类
  categories: CategoryModel[]
  // 是否已经加载过
  isLoaded: {
    tag: boolean
    category: boolean
    article: boolean
  }
  articles: ArticleModel
}

export const useArticleStore = defineStore('app-article', {
  state: (): { state: ArticleState } => ({
    state: {
      tags: [],
      categories: [],
      isLoaded: {
        tag: false,
        category: false,
        article: false
      },
      articles: {} as ArticleModel
    }
  }),
  actions: {
    async getTags(reLoad: boolean = false) {
      const { isLoaded, tags } = this.state
      if (isLoaded.tag && !reLoad) {
        return tags
      }
      return await this.getTagsAction()
    },
    async getCategories(reLoad: boolean = false) {
      const { isLoaded, categories } = this.state
      if (isLoaded.category && !reLoad) {
        return categories
      }
      return await this.getCategoriesAction()
    },
    async getArticles(reLoad: boolean = false) {
      const { isLoaded, articles } = this.state
      if (isLoaded.article && !reLoad) {
        return articles
      }
      return await this.getArticlesAction()
    },
    async reloadArticles() {
      this.state.isLoaded.article = false
    },
    async getTagsAction() {
      const tags = await getTags()
      this.state.isLoaded.tag = true
      this.state.tags = tags
      return tags
    },
    async getArticlesAction() {
      const articles = await getAllArticleApi()
      this.state.isLoaded.article = true
      this.state.articles = articles
      return articles
    },
    async getCategoriesAction() {
      const categories = await getCategories()
      this.state.isLoaded.category = true
      this.state.categories = categories
      return categories
    }
  }
})
