import Vue from 'vue'
import VueRouter from 'vue-router'

import layout from '../layout/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: 'welcome',
    children:[{
      path:'welcome',
      component: () => import('@/views/welcome')
    },
    // {
    //   path:'booksdetail',
    //   component: () => import('@/views/booksdetail')
    // },
    // {
    //   path:'myspace',
    //   component: () => import('@/views/myspace')
    // }
  ]
  },
  {
    path:'/login',
    name:'login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
