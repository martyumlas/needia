import axios from 'axios'

const chat = {
    state : {
        postMessages : [],
        postChat: ''
    },
    mutations: {
        setChatPost: (state, post) => state.postChat = post,
        setPostMessages: (state, messages) => state.postMessages = messages,
        addPostMessage: (state, message) => state.postMessages.push(message)
    },
    actions:{
        async getPostMessages({commit, rootGetters, state}, id){
            try {
                const res = await axios.get('api/user/'+rootGetters.user.id+'/post/'+id+'/messages', {
                   params:{
                    contact_id : state.postChat.user.id
                   }
                })
                commit('setPostMessages', res.data)

            } catch (error) {
                console.log(error)
            }
        },
        async sendMessage({rootGetters, state, commit}, payload){
            try {
                const res = await axios.post('api/user/'+rootGetters.user.id+'/post/'+state.postChat.id+'/message',{
                    contact_id : state.postChat.user.id,
                    text: payload
                })

                commit('addPostMessage', res.data.data)

            } catch (error) {
                console.log(error)
            }
        }
    },
    getters:{
        postMessages : (state) => state.postMessages,
        postChat : (state) => state.postChat
    }
}

export default chat