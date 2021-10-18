import { createStore } from 'vuex'

import authModule from './modules/auth/index.js'
import servidoresModule from './modules/servidores/index.js'
import empleadosModule from './modules/empleados/index.js'
import aplicacionesModule from './modules/aplicaciones/index.js'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: authModule,
    servidores: servidoresModule,
    empleados: empleadosModule,
    aplicaciones: aplicacionesModule
  }
})
