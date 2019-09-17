import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/TheLogin'
import Container from '../container/Container'
import Dashboard from '../views/dashboard/dashboard'
import Article from '../views/article/article'
import Page404 from '../views/404'


Vue.use(Router)

export const constantRouterMap = [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/404',
      name: '404',
      component: Page404
    },
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Container',
      component: Container,
      children: [
        {path: 'dashboard', name: '首页', component: Dashboard,
          children: [
            {path: 'dashboard1', name: '首页1', component: Dashboard,},
            {path: 'dashboard2', name: '首页2', component: Dashboard,
              children: [
                {path: 'dashboard21', name: '首页21', component: Dashboard,},
                {path: 'dashboard22', name: '首页22', component: Dashboard, },
              ] },
          ]
        },
        {path: 'article', name: '文章', component: Article, },
      ]
    },

  ]

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  /** 其他的异步路由表 */
  { path: '*', redirect: '/404', hidden: true }
]
