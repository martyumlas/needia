import Vuex from 'vuex'
import Vue from 'vue'
import post from './modules/post'
import axios from 'axios'
import router from '../router/index'
import createPersistedState from "vuex-persistedstate";
import utility from './modules/utility'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [createPersistedState()],
    modules:{
        post, utility
    },
    state:{
        user: '',
        password: '',
        isLoggedIn: false,
        message: '',
        errors: ''

    },
    mutations:{
        setUser : (state, user) => state.user = user,
        isLoggedIn : (state, status) => state.isLoggedIn = status,
        setMessage: (state, message) => state.message = message,
        setErrors: (state, errors) => state.errors = errors,
        setPassword: (state, password) => state.password = password
    },
    actions:{
        async register({commit}, payload)
        {
            commit('setErrors', '')
            try {
                const res = await axios.post('api/register', payload)
                commit('setMessage', res.data.message)
            } catch (error) {
               commit('setErrors', error.response.data.errors);
            }
        },
        async login({commit}, payload)
        {
            commit('setErrors', '')
            commit('setMessage', '')
            try {
                const res = await axios.post('api/login', payload)
                commit('setUser', res.data.user)
                commit('isLoggedIn', true)
                router.push('/')
            } catch (error) {
               commit('setErrors', error.response.data.error);
            }
        },
        logout({commit}){
            commit('isLoggedIn', false)
            commit('setUser', '')
            router.push('/')
        },
        async resetPassword({commit}, payload){
            commit('setErrors', '')
            commit('setMessage', '')
            try {
                const res = await axios.post('api/forgot-password', payload)

               commit('setMessage', res.data.message)
            } catch (error) {
                console.log(error)
            }
        }
    },
    getters:{
        user : (state) => state.user,
        message: (state) => state.message,
        isLoggedIn : (state) => state.isLoggedIn,
        errors : (state) => state.errors,
        password : (state) => state.password,
    }
})

export default store;