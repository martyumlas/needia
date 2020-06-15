import axios from 'axios'
import router from '../../router'
const post = {
    state:{
        offers:[],
        needs:[],
        postType: '',
        usersPost: [],
        post: '',
        isEditing: false
    },
    mutations:{
        setOffers:(state, offers) => state.offers = offers,
        setNeeds:(state, needs) => state.needs = needs,
        setPostType:(state, type) => state.postType = type,
        setUsersPost:(state, post) => state.usersPost = post,
        setPost:(state, post) => state.post = post,
        isEditing:(state,status) => state.isEditing = status
    },
    actions:{
        async getOffers({commit}){
            try {
                const res = await axios.get('api/post-offers')

                commit('setOffers', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getNeeds({commit}){
            try {
                const res = await axios.get('api/post-needs')

                commit('setNeeds', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getUsersPost({commit, rootGetters}, payload){
            try {
                const res = await axios.get('api/post/user/' + rootGetters.user.id, {
                    params:{
                        post_type : payload.id,
                        is_published: payload.is_published
                    }
                })

                commit('setUsersPost', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async createPost({commit, rootGetters, state, dispatch}, payload){
            commit('setMessage', '')
            commit('setErrors', '')
            try {

                let form = new FormData
                Object.entries(payload.post).forEach(([key, value]) =>{
                    form.append(key, value)
                })

                for( var i = 0; i < payload.images.length; i++ ){
                    let file = payload.images[i];

                    form.append('images[' + i + ']', file);
                }
                form.append('user_id', rootGetters.user.id)
                form.append('post_type', state.postType)
                form.append('offer_need_type_id', rootGetters.typeId)

                const res = await axios.post('api/post', form)
                commit('setMessage', res.data.message)
                if(state.postType == 1){
                    router.push('/profile')
                    dispatch('getUsersPost', state.postType)
                }else{
                    router.push('/my-needs')
                    dispatch('getUsersPost', state.postType)
                }

            } catch (error) {
                console.log(error)
                commit('setErrors', error.response.data.errors)
            }
        },
        async editPost({commit, state, dispatch }, payload){
            commit('setMessage', '')
            commit('setErrors', '')
            try {



                let form = new FormData
                Object.entries(payload.post).forEach(([key, value]) =>{
                    if(value === null){
                        value = ''
                    }
                    form.append(key, value)
                })

                for( var i = 0; i < payload.images.length; i++ ){
                    let file = payload.images[i];

                    form.append('images[' + i + ']', file);
                }

                // for( var j = 0; j < payload.postImages.length; j++ ){
                //     let file = payload.postImages[j];

                //     form.append('images[' + j + ']', file);
                // }


                form.append('_method', 'PATCH')
                form.delete('created_at')
                form.delete('updated_at')
                form.delete('user')
                // form.delete('images')
                form.delete('category')
                form.delete('sub_category')

                const res = await axios.post('api/post/' + payload.post.id, form)
                commit('setMessage', res.data.message)
                if(state.postType == 1){
                    router.push('/profile')
                    dispatch('getUsersPost', state.postType)
                }else{
                    router.push('/my-needs')
                    dispatch('getUsersPost', state.postType)
                }

            } catch (error) {
                console.log(error)
                commit('setErrors', error.response.data.errors)
            }
        },
        async deletePost({commit, state, dispatch}, id){
            try {
                const res = await axios.delete('api/post/' + id)

                commit('setMessage', res.data.message)
                if(state.postType == 1){
                    // router.push('/profile')
                    dispatch('getUsersPost', state.postType)
                }else{
                    // router.push('/my-needs')
                    dispatch('getUsersPost', state.postType)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getPost({commit}, id){
            commit('setMessage', '')
            commit('setErrors', '')
            try {
                const res = await axios.get('api/post/' + id)

                commit('setPost', res.data)

                console.log(res.data)

            } catch (error) {
                console.log(error)
            }
        },

    },
    getters:{
        offers: (state) => state.offers,
        needs: (state) => state.needs,
        postType: (state) => state.postType,
        usersPost: (state) => state.usersPost,
        post: (state) => state.post,
        isEditing : (state) => state.isEditing
    }
}

export default post;