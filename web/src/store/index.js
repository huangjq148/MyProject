import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        serverUrl: 'http://localhost:3000'
    },
    modules: {
        app,
        user
    },
    getters
})

export default store
