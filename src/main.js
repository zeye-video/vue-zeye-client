import Vue from 'vue'
import Vuex from 'vuex'

import App from './App.vue'
import zeyeClient from './index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    zeyeClient: { namespaced: true }
  }
})

Vue.use(zeyeClient, store, false)
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
