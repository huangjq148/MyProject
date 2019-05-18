import Vue from 'vue'
import Vuex from 'vuex'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/components'
import '@/utils'
// import '@/permission' // permission control

Vue.use(ElementUI, { locale })
Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    Vuex,
    store,
    render: h => h(App)
})
