import Vue from 'vue'
import VueRouter from 'vue-router'

import layout from '../layout/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: 'homepage',
    children:[{
      path:'homepage',
      component: () => import('@/views/homepage')
    },{
      path:'booksdetail',
      component: () => import('@/views/booksdetail')
    }]
  },
  {
    path:'/login',
    name:'login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
