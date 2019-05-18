import formUtils from './form.manager'
import objectUtils from './object.manager'
import baseApi from '@/api/base'
import moment from 'moment'
import Vue from 'vue'

Object.defineProperty(Vue.prototype, '$moment', { value: moment })
Object.defineProperty(Vue.prototype, '$obj', { value: objectUtils })
Object.defineProperty(Vue.prototype, '$form', { value: formUtils })
Object.defineProperty(Vue.prototype, '$api', { value: baseApi })

Vue.filter('dataFormatter', function(value, fmt = 'YYYY-MM-DD') {
    return moment(value).format(fmt)
})
