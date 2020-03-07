import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import books from './modules/books'


import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    books
  },
  getters
})

export default store