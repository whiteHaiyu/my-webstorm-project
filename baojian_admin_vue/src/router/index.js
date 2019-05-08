import Vue from 'vue'
import Router from 'vue-router'
import homepage from '@/components/guide'
import home from '@/components/home'
import user_admin from '@/components/user_admin'
import log_admin from '@/components/log_admin'
import login from '@/components/login'
import dotinfo_admin from '@/components/dotinfo_admin'
import hr_admin from '@/components/hr_admin'
import car_admin from '@/components/car_admin'
import car_admin2 from '@/components/car_admin2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/welcome',
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: login
    },
    {
      path: '/admin',
      name: 'homepage',
      redirect: '/admin/home',
      component: homepage,
      children:[
        {
          path: '/admin/home',
          name: 'home',
          component: home
        },
        {
          path: '/admin/user_admin',
          name: 'user_admin',
          component: user_admin
        },
        {
          path: '/admin/log_admin',
          name: 'log_admin',
          component: log_admin
        },
        {
          path: '/admin/dotinfo_admin',
          name: 'dotinfo_admin',
          component: dotinfo_admin
        },
        {
          path: '/admin/hr_admin',
          name: 'hr_admin',
          component: hr_admin
        },
        {
          path: '/admin/car_admin',
          name: 'car_admin',
          component: car_admin
        },
        {
          path: '/admin/car_admin2',
          name: 'car_admin2',
          component: car_admin2
        }
      ]
    }
  ]
})
