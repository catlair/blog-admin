import { RoleEnum } from '@/enums/roleEnum'
import { RouteMeta } from 'vue-router'

export interface Menu {
  name: string

  icon?: string

  path: string

  // 路径包含参数，自动赋值。
  paramPath?: string

  disabled?: boolean

  children?: Menu[]

  orderNo?: number

  roles?: RoleEnum[]

  meta?: Partial<RouteMeta>

  hideMenu?: boolean
}
