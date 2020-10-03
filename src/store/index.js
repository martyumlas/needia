import Vuex from 'vuex'
import Vue from 'vue'
import post from './modules/post'
import axios from 'axios'
import router from '../router/index'
import createPersistedState from "vuex-persistedstate";
import utility from './modules/utility'
import chat from './modules/chat'
import messaging from '../firebase'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [createPersistedState()],
    modules:{
        post, utility, chat
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
        profile: '',
        token: '',
        basicAuth: ''

    },
    mutations:{
        setUser : (state, user) => state.user = user,
        setProfile : (state, user) => state.profile = user,
        isLoggedIn : (state, status) => state.isLoggedIn = status,
        setMessage: (state, message) => state.message = message,
        setErrors: (state, errors) => state.errors = errors,
        setPassword: (state, password) => state.password = password,
        setUpdateUser:(state, user) => state.updateUser =  user,
        setToken : (state, token) => state.token = token,
        setBaseUrl : (state, url) => state.baseUrl =url,
        setBasicAuth :(state, basicAuth) => state.basicAuth = basicAuth
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
        async login({commit, dispatch}, payload)
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

                    dispatch('getToken')

                    setTimeout(() => {

                        dispatch('registerToken')

                    }, 10000);

                }



            } catch (error) {
               commit('setErrors', error.response.data.errors);
               console.log(error )
            }
        },
        logout({commit, dispatch}){

            dispatch('removeToken')
            commit('isLoggedIn', false)
            commit('setUser','')
            commit('setToken', '')
            dispatch('fetchPost')
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
                commit('setUser', res.data)
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
                form.delete('active_hours')
                form.append('days',  JSON.stringify(payload.days))
                form.append('documents', JSON.stringify(payload.documents))
                form.append('document_image', payload.document_image)
                form.append('_method','PATCH')

                const res = await axios.post('api/user/' + payload.user.id, form)
                commit('setMessage', res.data.message)
                commit('setUser', res.data.user)
                commit('setUpdateUser', res.data.user)
                router.push('/user-profile/' + payload.user.id)

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
        },
        async deleteDoc({commit,state}, id){
            try {
                const res = await axios.delete('api/user/'+state.user.id+'/document/' + id )
                commit('setProfile', res.data)
            } catch (error) {
                console.log(error)
            }


        },
         getToken({commit}){
             messaging.requestPermission().then(function(){
                console.log('have permission')
                return messaging.getToken()
            }).then(function(token){
                console.log(token)
                commit('setToken', token)
            })
            .catch(function(err){
                console.log(err)
            })


            messaging.onMessage(function(payload){
                console.log('onMessage', payload)
            })
        },
        async registerToken({rootGetters, state}){
            try {
                const res = await axios.post('api/users/'+rootGetters.user.id+'/fcm_registration_tokens',{
                    registration_id : state.token
                })

                console.log(res.data)
            } catch (error) {
                console.log(error)
                // dispatch('registerToken')
            }
        },
        async removeToken({rootGetters, state, }){
            try {
                const res = await axios.delete('api/users/'+rootGetters.user.id+'/fcm_registration_tokens',{
                    data:{
                        registration_id : state.token
                    }
                })

                console.log(res.data)
            } catch (error) {
                console.log(error)


            }
        },
    },
    getters:{
        user : (state) => state.user,
        message: (state) => state.message,
        isLoggedIn : (state) => state.isLoggedIn,
        errors : (state) => state.errors,
        password : (state) => state.password,
        baseUrl : (state) => state.baseUrl,
        updateUser: (state) => state.updateUser,
        profile: (state) => state.profile,
        basicAuth : (state) => state.basicAuth
    }
})

export default store;
