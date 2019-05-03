// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import md5 from 'js-md5'
import store from './store'
import axios from 'axios'

import util from '@/util/util'

Vue.prototype.$md5 = md5
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.prototype.util = util

Vue.use(ElementUI)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
