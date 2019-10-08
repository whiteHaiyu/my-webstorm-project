// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FormMaking from 'form-making'
import 'form-making/dist/FormMaking.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'



//ElementUI
import formCreate from 'form-create/element'
//获取生成器
import { maker } from 'form-create/element'

//三级联动数据,不用可以不引入
import 'form-create/district/province_city_area.js'

Vue.use(formCreate)


Vue.use(VueAxios,axios);

Vue.use(FormMaking)
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
