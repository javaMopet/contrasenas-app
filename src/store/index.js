import { createStore } from 'vuex'

import authModule from './modules/auth/index.js'
import servidoresModule from './modules/servidores/index.js'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: authModule,
    servidores: servidoresModule
  }
})
