import { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { scrollBehavior } from './scrollBehavior'
import store from '@/store/index'
import { AppRouteRecordRaw, AppRouteMetaConfig } from '@/types'
import { getToken, getUserInfo } from '@/utils/cache'

// basic routes 基础路由
const basicRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('@/views/help/index.vue')
  },
  {
    path: '/ceci',
    name: 'Ceci',
    component: () => import('@/views/ceci/index.vue')
  },
  {
    path: '/ceci/:id',
    name: 'CeciDetail',
    component: () => import('@/views/ceci/detail.vue')
  },
  {
    path: '/res',
    name: 'Res',
    component: () => import('@/views/res/index.vue')
  },
  {
    path: '/course',
    name: 'Course',
    component: () => import('@/views/course/index.vue')
  },
  {
    path: '/reslink',
    name: 'Reslink',
    component: () => import('@/views/reslink/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登陆',
      hideFooter: true,
      hideHeader: true,
      hideSidebar: true
    }
  }
]

// auth routes 权限路由
const authRoutes: AppRouteRecordRaw[] = [
  {
    path: '/notice',
    component: () => import('@/views/notice/index.vue'),
    meta: {
      title: '我的通知',
      auth: true
    }
  },
  {
    path: '/cart',
    component: () => import('@/views/cart/index.vue'),
    meta: {
      title: '购物车',
      auth: true
    }
  },
  {
    path: '/lesson',
    component: () => import('@/views/lesson/index.vue'),
    meta: {
      title: '我的课程',
      auth: true
    }
  },
  {
    path: '/order',
    component: () => import('@/views/order/index.vue'),
    meta: {
      title: '我的订单',
      auth: true
    }
  },
  {
    path: '/integral',
    component: () => import('@/views/integral/index.vue'),
    meta: {
      title: '积分商城',
      auth: true
    }
  },
  {
    path: '/user',
    redirect: '/user/binding',
    component: () => import('@/views/user/index.vue'),
    children: [
      {
        path: 'binding',
        component: () => import('@/views/user/binding/index.vue'),
        meta: {
          title: '账号绑定',
          auth: true
        }
      },
      {
        path: 'profile',
        component: () => import('@/views/user/profile/index.vue'),
        meta: {
          title: '个人资料',
          auth: true
        }
      },
      {
        path: 'log',
        component: () => import('@/views/user/log/index.vue'),
        meta: {
          title: '操作记录',
          auth: true
        }
      },
      {
        path: 'address',
        component: () => import('@/views/user/address/index.vue'),
        meta: {
          title: '收件地址',
          auth: true
        }
      }
    ]
  }
]

// full routes 全部路由
const routes = [
  ...basicRoutes,
  ...authRoutes
] as RouteRecordRaw[]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: scrollBehavior,
  routes: routes
})

router.beforeEach((to, from, next) => {
  const meta = to.meta as AppRouteMetaConfig
  document.title = meta.title ? `课程视频网-${meta.title}` : '课程视频网-小初高课程视频配套课件教案逐字稿专业分享平台'
  const token = getToken()
  if (token) {
    const userInfo = getUserInfo()
    if (!userInfo.uid) {
      store.dispatch('user/getInfo', token)
    }
  }
  if (meta && meta.auth) {
    token ? next() : next('/login')
  } else {
    next()
  }
})

export function setupRouter (app: App<Element>) {
  app.use(router)
}

export default router
