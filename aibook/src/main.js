import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// 挂在全局过滤器
import * as index from '@/filters/index'
Object.keys(index).forEach(key => {
 Vue.filter(key, index[key])
})

// 亚马逊字符库
import 'font-awesome/scss/font-awesome.scss'

// 按需引入element-ui组件
import 'element-ui/lib/theme-chalk/index.css'
import { Message, Card, Button, Row, Col, Loading, Input, Dropdown, DropdownMenu,  DropdownItem,   Table, TableColumn,} from 'element-ui'

Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Button)
Vue.use(Input)
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Table);
Vue.use(TableColumn);


Vue.use(Loading.directive);

Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service;

Vue.config.productionTip = false

// 原型链挂载方法
Vue.prototype.$axios = axios
import { getToken, setToken, removeToken } from './utils/auth' 
Vue.prototype.$getToken = getToken
Vue.prototype.$setToken = setToken
Vue.prototype.$removeToken = removeToken

// 全局静态数据存储
import myStore from '@/components/myStore';
Vue.prototype.$myStore = myStore;

// i18n国际化
import VueI18n from 'vue-i18n'        //引入vue-i18n
Vue.use(VueI18n);  
/*---------使用语言包-----------*/
const i18n = new VueI18n({
  locale: 'en',    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh': require('./components/lang/zh'),   // 中文语言包
    'en': require('./components/lang/en')    // 英文语言包
  }
})

window.i18n = i18n

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
