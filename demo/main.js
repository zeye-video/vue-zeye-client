import Vue from 'vue'
import Vuex from 'vuex'

import App from './Demo.vue'
import zeyeClient from '../src'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    zeyeClient: { namespaced: true }
  }
})

Vue.use(zeyeClient, store)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
