import axios from 'axios'
const post = {
    state:{
        offers:[],
        postType: ''
    },
    mutations:{
        setOffers:(state, offers) => state.offers = offers,
        setPostType:(state, type) => state.postType = type
    },
    actions:{
        async getOffers({commit}){
            try {
                const res = await axios.get('api/post-offers')

                commit('setOffers', res.data)
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async createPost({commit, rootGetters}, payload){
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

                const res = await axios.post('api/post', form)
                console.log(res.data.message)
            } catch (error) {
                commit('setErrors', error.response.data.errors)
            }
        }
    },
    getters:{
        offers: (state) => state.offers
    }
}

export default post;