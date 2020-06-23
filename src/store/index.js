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
        errors: '',
        // baseUrl : 'https://needia.demo.thinkbitsolutions.com/',
       baseUrl : 'http://localhost:6600/',
        updateUser: '',
        profile: ''

    },
    mutations:{
        setUser : (state, user) => state.user = user,
        setProfile : (state, user) => state.profile = user,
        isLoggedIn : (state, status) => state.isLoggedIn = status,
        setMessage: (state, message) => state.message = message,
        setErrors: (state, errors) => state.errors = errors,
        setPassword: (state, password) => state.password = password,
        setUpdateUser:(state, user) => state.updateUser =  user
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
               console.log(error.response )
            }
        },
        async login({commit}, payload)
        {
            commit('setErrors', '')
            commit('setMessage', '')
            try {
                const res = await axios.post('api/login', payload)
                console.log(res.data)
                if(res.data.user.email_verified_at == null){
                    commit('setErrors', res.data.message)
                    console.log(res.data)
                }else{
                    commit('setUser', res.data.user)
                    commit('isLoggedIn', true)
                    router.push('/')
                }

            } catch (error) {
               commit('setErrors', error.response.data.errors);
               console.log(error.response )
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
        },
        async getUser({commit, state}){
            try {
                const res = await axios.get('api/user/' + state.user.id)
                commit('setUpdateUser', res.data)
            } catch (error) {
                commit('setErrors', error.response.data.errors);
            }
        },
        async updateUser({commit}, payload){
            commit('setMessage','')
            commit('setErrors', '')
            try {
                let form = new FormData

                Object.entries(payload.user).forEach(([key, value]) =>{
                    form.append(key, value)
                })
                form.append('image', payload.image)
                form.append('_method','PATCH')
                form.delete('role')
                form.delete('deleted_at')
                form.delete('updated_at')
                form.delete('created_at')
                form.delete('photo_alt')
                form.delete('photo_extension')
                form.delete('photo_url')
                form.delete('fcm_notification_key')

                // let days = [
                //     {
                //         day: 'monday',
                //         opening: '7:00',
                //         closing: '7:00'
                //     },
                //     {
                //         day: 'tuesday',
                //         opening: '7:00',
                //         closing: '7:00'
                //     },
                //     {
                //         day: 'wednesday',
                //         opening: '8:00',
                //         closing: '8:00'
                //     },
                // ]

                // var json_arr = JSON.stringify(days);
                // form.append('days', json_arr)
                form.append('_method','PATCH')

                const res = await axios.post('api/user/' + payload.user.id, form)
                commit('setMessage', res.data.message)
                commit('setUser', res.data.user)
                commit('setUpdateUser', res.data.user)
                console.log(res.data)

            } catch (error) {
                commit('setErrors', error.response.data.errors);
            }
        },
        async updatePassword({commit,state}, payload){
            commit('setMessage', '')
            commit('setErrors', '')
            try {
                let form = new FormData

                Object.entries(payload).forEach(([key, value]) =>{
                    form.append(key, value)
                })

                form.append('_method', 'PATCH')

                const res = await axios.post('api/user/' + state.user.id + '/update-password', form)
                commit('setMessage', res.data.message)
                if(res.status == 200){
                    commit('setPassword', payload.password)
                }
            } catch (error) {
                console.log(error.response.status)
                commit('setErrors', error.response.data.errors);
            }
        },
        async getUserProfile({commit}, id){
            try {
                const res = await axios.get('api/user/' + id)
                commit('setProfile', res.data)
            } catch (error) {
               console.log(error)
            }
        },
        async bookmarkUser({dispatch, state}, payload){
            try {
                const res = await axios.post('api/user/'+state.user.id+'/bookmark', payload)
                console.log(res.data)
                dispatch('getUserProfile', payload.user_id)
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
        baseUrl : (state) => state.baseUrl,
        updateUser: (state) => state.updateUser,
        profile: (state) => state.profile
    }
})

export default store;
