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
npm install stasoft91/vue-zeye-client
```

## Yarn

```sh
yarn add stasoft91/vue-zeye-client
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
```html
<div style="width:250px">
    <zeye-peer-media  :show-volume-bar="true" :peer-id="$zeyeClient.getMe().id"></zeye-peer-media>
</div>

<div style="width:250px" v-for="peer in $zeyeClient.getPeers()" :key="peer.id">
    <zeye-peer-media  :show-volume-bar="true"  :peer-id="peer.id"></zeye-peer-media>
</div>
```
And in script section:
```javascript
export default {
    mounted() {
        this.$zeyeClient.setRoomUrl()
        
        const roomId = 'example01'
        const peerId = 'example' + Math.random()
                
        this.$zeyeClient.join({
            roomId,
            peerId,
            displayName: this.$zeyeClient.getMe().displayName
        })
    }
}
```

## For Nuxt
1. Create empty zeyeClient.js in store
2. Create plugins/vue-zye-client.js with code below then mention it in plugins section in nuxt.config.js

```
// plugins/vue-zeye-client.js
import zeyeClient from 'vue-zeye-client'
import Vue from 'vue'

export default ({ store }) => {
  Vue.use(zeyeClient, store)
}
```


### Also we have some documentation
See [Docs](./docs)
