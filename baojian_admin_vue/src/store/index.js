import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {   //要设置的全局访问的state对象
  loginState: '',
  user_icon: '',
  detailsId: '',
  patientName: ''
};

const getters = {   //实时监听state值的变化(最新状态)

};

const mutations = {
  change(state, user) { //同上，这里面的参数除了state之外还传了需要增加的值sum
    state.loginState = user;
  },

  getIcon(state, icon) {
    state.user_icon = icon;
  },

  getId(state, id) {
    state.detailsId = id
  },

  getName(state, name) {
    state.patientName = name
  }

};

const store = new Vuex.Store({
  state,
  getters,
  mutations
});

export default store;
