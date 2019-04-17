import Vue from 'vue'
import Router from 'vue-router'

import welcome from '@/components/welcome'
import login from '@/components/user_login'
import signin from '@/components/user_signin'
import forget from '@/components/user_forget'
import detail from '@/components/card_detail'
import create from '@/components/card_create'
import modify from '@/components/card_modify'
import squaredetail from '@/components/square_detail'
import mymsg from '@/components/mymsg'
import mybody from '@/components/mybody'
import autocreate from '@/components/card_create_auto'

import card from '@/components/card'
import square from '@/components/square'
import mine from '@/components/mine'

import guide from '@/components/guide'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: welcome
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin
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
      path: '/autocreate',
      name: 'autocreate',
      component: autocreate
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
    },
    {
      path: '/square_detail',
      name: squaredetail,
      component: squaredetail
    },
    {
      path: '/mymsg',
      name: mymsg,
      component: mymsg
    },
    {
      path: '/mybody',
      name: mybody,
      component: mybody
    },
    {
      path: '/guide',
      name: 'guide',
      redirect: '/guide/card',
      component: guide,
      children: [
        {
          path: 'square',
          component: square
        },
        {
          path: 'card',
          component: card
        },
        {
          path: 'mine',
          component: mine
        }
      ]
    }
  ]
})
