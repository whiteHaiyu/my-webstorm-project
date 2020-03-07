import Vue from 'vue'
import VueRouter from 'vue-router'

import layout from '@/layout'

Vue.use(VueRouter)

// 判断路由是否后退
VueRouter.prototype.goBack = function(){
  this.isBack = true
  window.history.go(-1)
}

const routes = [
  {
    path: '/',
    component: layout,
    redirect: '/budget',
    children: [
      {
        path: 'budget',
        name: 'budget',
        meta: { index:1 },
        component: () => import('@/views/budget.vue')
      },{
        path: 'account',
        name: 'account',
        meta: { index:2 },
        component: () => import('@/views/account.vue')
      },{
        path: 'find',
        name: 'find',
        meta: { index:3 },
        component: () => import('@/views/find.vue')
      },{
        path: 'mine',
        name: 'mine',
        meta: { index:4 },
        component: () => import('@/views/mine.vue')
      },
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/create_budget',
    component: () => import('@/views/create_budget/index.vue')
  },
  {
    path: '/create_ledger/:type',
    component: () => import('@/views/create_ledger/index.vue')
  },
  {
    path: '/addAccount',
    component: () => import('@/views/create_account/index')
  },
  {
    path: '/chooseAccountType',
    component: () => import('@/views/create_account/chooseAccountType')
  },
  {
    path: '/accountDetail',
    component: () => import('@/views/detail_account/index')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
