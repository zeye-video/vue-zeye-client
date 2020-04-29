# Installation

## Direct Download / CDN

https://unpkg.com/vue-zeye-client/dist/vue-zeye-client 

Include vue-zeye-client after Vue and it will install itself automatically:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-zeye-client/dist/vue-zeye-client.js"></script>
```

## NPM

```sh
$ npm install vue-zeye-client
```

## Yarn

```sh
$ yarn add vue-zeye-client
```

When used with a module system, you must explicitly install the `vue-zeye-client` via `Vue.use()`:

```javascript
import Vue from 'vue'
import vueZeyeClient from 'vue-zeye-client'

Vue.use(vueZeyeClient)
```

You don't need to do this when using global script tags.

## Dev Build

You will have to clone directly from GitHub and build `vue-zeye-client` yourself if
you want to use the latest dev build.

```sh
$ git clone https://github.com//vue-zeye-client.git node_modules/vue-zeye-client
$ cd node_modules/vue-zeye-client
$ npm install
$ npm run build
```

