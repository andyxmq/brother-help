import Vue from 'vue'
import App from './App'

import Store from './stores/store'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = Store

const app = new Vue(App)
app.$mount()
