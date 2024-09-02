import type { RouteRecordRaw } from 'vue-router';
import BaseLayout from '@/layouts/base-layout/index.vue';
import BlankLayout from '@/layouts/blank-layout/index.vue';

/** builtin routes, it must be constant and setup in vue-router */
const builtinRoutes: RouteRecordRaw[] = [
  {
    name: 'root',
    path: '/',
    redirect: import.meta.env.VITE_ROUTE_HOME || '/home',
    meta: {
      title: 'root',
      constant: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: BlankLayout,
    meta: {
      title: 'not-found'
    },
    children: [
      {
        name: 'not-found',
        path: '',
        component: () => import('@/views/_builtin/404/index.vue'),
        meta: {
          title: 'not-found',
          constant: true
        },
        props: true
      }
    ]
  },
  {
    path: '/403',
    component: BlankLayout,
    meta: {
      title: '403'
    },
    children: [
      {
        name: '403',
        path: '',
        component: () => import('@/views/_builtin/403/index.vue'),
        meta: {
          title: '403',
          i18nKey: 'route.403',
          hideInMenu: true,
          constant: true
        }
      }
    ]
  },
  {
    path: '/404',
    component: BlankLayout,
    meta: {
      title: '404'
    },
    children: [
      {
        name: '404',
        path: '',
        component: () => import('@/views/_builtin/404/index.vue'),
        meta: {
          title: '404',
          i18nKey: 'route.404',
          hideInMenu: true,
          constant: true
        }
      }
    ]
  },
  {
    path: '/500',
    component: BlankLayout,
    meta: {
      title: '500'
    },
    children: [
      {
        name: '500',
        path: '',
        component: () => import('@/views/_builtin/500/index.vue'),
        meta: {
          title: '500',
          i18nKey: 'route.500',
          hideInMenu: true,
          constant: true
        }
      }
    ]
  },
  {
    path: '/iframe-page/:url',
    component: BaseLayout,
    meta: {
      title: 'iframe-page'
    },
    children: [
      {
        name: 'iframe-page',
        path: '',
        component: () => import('@/views/_builtin/iframe-page/[url].vue'),
        meta: {
          title: 'iframe-page',
          i18nKey: 'route.iframe-page',
          hideInMenu: true,
          keepAlive: true,
          constant: true
        },
        props: true
      }
    ]
  },
  {
    path: '/login/:module(pwd-login|code-login|register|reset-pwd|bind-wechat)?',
    component: BlankLayout,
    meta: {
      title: 'login'
    },
    children: [
      {
        name: 'login',
        path: '',
        component: () => import('@/views/_builtin/login/index.vue'),
        meta: {
          title: 'login',
          i18nKey: 'route.login',
          hideInMenu: true,
          constant: true
        },
        props: true
      }
    ]
  }
];

/** create builtin vue routes */
export function createBuiltinVueRoutes() {
  return builtinRoutes;
}
