export interface ListModel {
  list: Array<{
    _id: string
  }>
  totalPage: number
  total: number
  curPage: number
}

// 分页参数
export interface PaginationParms {
  pn?: number
  ps?: number
  sort?: string
}
