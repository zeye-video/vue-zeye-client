import consumers from './store/consumers'
import dataConsumers from './store/dataConsumers'
import dataProducers from './store/dataProducers'
import index from './store'
import me from './store/me'
import notifications from './store/notifications'
import peers from './store/peers'
import producers from './store/producers'
import room from './store/room'
import registerFunctions from './zeyeFunctions'
import ZeyeClient from './utils/ZeyeClient'
import zeyePeerMedia from './components/zeyePeerMedia.vue'

const zeyeClient = {
  install(Vue, store, preserveState) {
    store.registerModule(['zeyeClient', 'consumers'], consumers, {
      preserveState
    })
    store.registerModule(['zeyeClient', 'dataConsumers'], dataConsumers, {
      preserveState
    })
    store.registerModule(['zeyeClient', 'dataProducers'], dataProducers, {
      preserveState
    })
    store.registerModule(['zeyeClient', 'index'], index, {
      preserveState
    })
    store.registerModule(['zeyeClient', 'me'], me, {
      preserveState
    })
    store.registerModule(['zeyeClient', 'notifications'], notifications, {
      preserveState
    })
    store.registerModule(['zeyeClient', 'peers'], peers, {
      preserveState
    })
    store.registerModule(['zeyeClient', 'producers'], producers, {
      preserveState
    })
    store.registerModule(['zeyeClient', 'room'], room, {
      preserveState
    })

    /**
     * @type {ZeyeClient}
     */
    this.$zeyeClient = new ZeyeClient({ store })
    Vue.prototype.$zeyeClient = this.$zeyeClient
    Vue.$zeyeClient = this.$zeyeClient
    Vue.component('zeye-peer-media', zeyePeerMedia)

    registerFunctions({ app: this, store })
  }
}

export default zeyeClient

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(zeyeClient)
}
