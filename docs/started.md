# Getting Started

Pronouced like [zaɪ]Client

VueZeyeClient relies heavily on vuex. 
Everything under the hood work is in there, so installing vuex is mandatory.

## HTML

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue/dist/vuex.js"></script>
<script src="https://unpkg.com/vue-zeye-client/dist/vue-zeye-client.js"></script>

<div id="#app">
  <!-- NOTE: here the outputs -->
</div>
```

## NPM

```sh
npm install vue-zeye-client
```

## Yarn

```sh
yarn add vue-zeye-client
```

## JavaScript

```javascript
// If using a module system (e.g. via Vue CLI), import Vue and vue-zeye-client and then call Vue.use(vue-zeye-client).
// import Vue from 'vue'
// import Vuex from 'vuex'
// import vueZeyeClient from 'vue-zeye-client'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    /*
        this line us mandatory, because all zeyeClient vuex modules are designed 
        to be nested under 'zeyeClient' to prevent any conflicts with existing store
    */
    zeyeClient: { namespaced: true }
  }
})

Vue.use(zeyeClient, store)

// Now the app has started!
new Vue({ }).$mount('#app')
```

Then somewhere in your `conference.vue`:
```javascript
mounted() {
  this.$zeyeClient.setRoomUrl()
    
  const roomId = 'example01'
  const peerId = 'example' + Math.random()

  this.$zeyeClient.setMe(peerId)

  this.$zeyeClient.join({
    roomId,
    peerId,
    displayName: this.$zeyeClient.getMe().displayName
  })
}
```