export {}

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    orderNo?: number
    // 标题
    title: string
    // 动态路由等级
    dynamicLevel?: number
    // 动态路由真实路径
    realPath?: string
    // 忽略权限
    ignoreAuth?: boolean
    // 规则
    roles?: string[]
    // 忽略缓存
    ignoreKeepAlive?: boolean
    // 是固定 tab 页
    affix?: boolean
    // 图标
    icon?: string
    // iframe 加载页面
    frameSrc?: string
    // 当前页面的过渡效果
    transitionName?: string
    // 隐藏面包屑
    hideBreadcrumb?: boolean
    // 隐藏子菜单
    hideChildrenInMenu?: boolean
    //  带有参数的路由
    carryParam?: boolean
    // 单层菜单
    single?: boolean
    // 当前活动的路由
    currentActiveMenu?: string
    // 不显示在 tab 中
    hideTab?: boolean
    // 隐藏菜单
    hideMenu?: boolean
    // 是链接而非路由
    isLink?: boolean
    // 忽略权限和路由，只显示菜单
    ignoreRoute?: boolean
    // 隐藏子路由的菜单
    hidePathForChildren?: boolean
  }
}
