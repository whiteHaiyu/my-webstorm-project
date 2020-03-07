import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import * as index from '@/filters/index'
Object.keys(index).forEach(key => {
 Vue.filter(key, index[key])
})

import 'font-awesome/scss/font-awesome.scss'

import 'element-ui/lib/theme-chalk/index.css'
import { Message, Card, Button, Row, Col, Loading, Input } from 'element-ui'

Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Button)
Vue.use(Input)

Vue.use(Loading.directive);

Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service;

Vue.config.productionTip = false

Vue.prototype.$axios = axios

import { getToken, setToken, removeToken } from './utils/auth' 
Vue.prototype.$getToken = getToken
Vue.prototype.$setToken = setToken
Vue.prototype.$removeToken = removeToken

import myStore from '@/components/myStore';
Vue.prototype.$myStore = myStore;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
