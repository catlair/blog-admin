import { RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'
import { RoleEnum } from '@/enums/roleEnum'
import Layout from '@/layouts/index.vue'
import EXCEPTION_COMPONENT from '@/views/exception/Exception.vue'

export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'PageNotFound',
  component: Layout,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'PageNotFound',
      component: EXCEPTION_COMPONENT,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true
      }
    }
  ]
}

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard/analysis',
    meta: {
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
      icon: 'bx:bx-home',
      roles: [RoleEnum.Admin, RoleEnum.Author]
    },
    children: [
      {
        path: 'post',
        name: 'Post',
        component: () => import('@/views/articles/post/index.vue'),
        meta: {
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
    meta: {
      title: '消息管理',
      hideChildrenInMenu: true,
      icon: 'bx:bx-home',
      roles: [RoleEnum.Admin]
    },
    children: [
      {
        path: 'comments',
        name: 'Comments',
        component: () => import('@/views/messages/comments/index.vue'),
        meta: {
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
    redirect: PageEnum.BASE_HOME,
    meta: {
      title: '首页',
      icon: 'bx:bx-home'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      hideMenu: true,
      hideBreadcrumb: true
    }
  },
  PAGE_NOT_FOUND_ROUTE
]
