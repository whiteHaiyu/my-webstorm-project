import Vue from 'vue'
import Router from 'vue-router'

import welcome from '@/components/welcome'
import home from '@/components/homepage'
import login from '@/components/login'
import signin from '@/components/signin'
import forget from '@/components/forget'
import detail from '@/components/detail'
import create from '@/components/create'
import modify from '@/components/modify'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: welcome
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/signin',
      name:'signin',
      component:signin
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/forget',
      name: 'forget',
      component: forget
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/create',
      name: 'create',
      component: create
    },
    {
      path: '/modify',
      name: 'modify',
      component: modify
    }
  ]
})
