import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Layout from '@/layouts/index.vue'

export const constantRoutes = []

// asyncRoutes 动态路由
export const asyncRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard/analysis',
    meta: {
      hideMenu: true,
      hideBreadcrumb: true,
      title: '首页',
      currentActiveMenu: '/dashboard',
      icon: 'bx:bx-home'
    },
    children: [
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('@/views/dashboard/analysis/index.vue'),
        meta: {
          hideMenu: true,
          hideBreadcrumb: true,
          affix: true,
          title: '分析页',
          currentActiveMenu: '/dashboard',
          icon: 'bx:bx-home'
        }
      },
      {
        path: 'workbench',
        name: 'Workbench',
        component: () => import('@/views/dashboard/workbench/index.vue'),
        meta: {
          hideMenu: true,
          hideBreadcrumb: true,
          title: '工作台',
          currentActiveMenu: '/dashboard',
          icon: 'bx:bx-home'
        }
      }
    ]
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Layout,
    redirect: '/articles/post',
    meta: {
      title: '文章管理',
      hideChildrenInMenu: true,
      icon: 'bx:bx-home'
    },
    children: [
      {
        path: 'post',
        name: 'Post',
        component: () => import('@/views/articles/post/index.vue'),
        meta: {
          hideMenu: true,
          hideBreadcrumb: true,
          title: '发布文章',
          currentActiveMenu: '/articles',
          icon: 'bx:bx-home'
        }
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/articles/list/index.vue'),
        meta: {
          hideMenu: true,
          hideBreadcrumb: true,
          title: '文章列表',
          currentActiveMenu: '/articles',
          icon: 'bx:bx-home'
        }
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('@/views/articles/categories/index.vue'),
        meta: {
          hideMenu: true,
          hideBreadcrumb: true,
          title: '分类',
          currentActiveMenu: '/articles',
          icon: 'bx:bx-home'
        }
      },
      {
        path: 'tags',
        name: 'Tags',

        component: () => import('@/views/articles/tags/index.vue'),
        meta: {
          hideMenu: true,
          hideBreadcrumb: true,
          title: '标签',
          currentActiveMenu: '/articles',
          icon: 'bx:bx-home'
        }
      }
    ]
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Layout,
    redirect: '/messages/comments',
    meta: { title: '消息管理', hideChildrenInMenu: true, icon: 'bx:bx-home' },
    children: [
      {
        path: 'comments',
        name: 'Comments',
        component: () => import('@/views/messages/comments/index.vue'),
        meta: {
          hideMenu: true,
          hideBreadcrumb: true,
          title: '评论',
          currentActiveMenu: '/messages',
          icon: 'bx:bx-home'
        }
      },
      {
        path: 'leave',
        name: 'Leave',
        component: () => import('@/views/messages/leave/index.vue'),
        meta: {
          hideMenu: true,
          hideBreadcrumb: true,
          title: '留言',
          currentActiveMenu: '/messages',
          icon: 'bx:bx-home'
        }
      }
    ]
  }
]

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: '/dashboard',
    meta: {
      title: '首页',
      icon: 'bx:bx-home'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

asyncRoutes.forEach((route) => {
  router.addRoute(route)
})

export default router
