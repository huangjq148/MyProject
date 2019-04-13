import Vue from 'vue'
import Vuex from 'vuex'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/components'
// import '@/permission' // permission control

Vue.use(ElementUI, { locale })
Vue.use(Vuex)

Object.defineProperty(Vue.prototype, '$moment', { value: moment })

Vue.filter('dataFormatter', function(value, fmt) {
    return moment(value).format(fmt)
})

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    Vuex,
    store,
    render: h => h(App)
})
