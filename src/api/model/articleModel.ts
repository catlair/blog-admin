interface CreateArticleParms {
  title: string
  content: string
  category: string
  tags: string[]
  status?: number
  visibility?: number
  isTop?: boolean
}
