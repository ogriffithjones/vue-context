import Vue from 'vue'
import App from './App.vue'

import VueContextMenu from '../src/index.js'
Vue.component('vue-simple-context-menu', VueContextMenu)

new Vue({
  el: '#app',
  render: h => h(App)
})
