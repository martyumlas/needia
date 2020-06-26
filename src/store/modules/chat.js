import axios from 'axios'

const chat = {
    state : {
        postMessages : [],
        postChat: '',
        messages: '',
        isReplying: false,
        contact_id: ''
    },
    mutations: {
        setChatPost: (state, post) => state.postChat = post,
        setPostMessages: (state, messages) => state.postMessages = messages,
        addPostMessage: (state, message) => state.postMessages.push(message),
        setMessages: (state, messages) => state.messages = messages,
        isReplying: (state, status) => state.isReplying = status,
        contact_id : (state, contact_id) => state.contact_id = contact_id

    },
    actions:{
        async getPostMessages({commit, rootGetters}, payload){
            try {
                const res = await axios.get('api/user/'+rootGetters.user.id+'/post/'+payload.id+'/messages', {
                   params:{
                    contact_id : payload.contact_id
                   }
                })
                commit('setPostMessages', res.data)

                // console.log(res.data)

            } catch (error) {
                console.log(error)
            }
        },
        async sendMessage({rootGetters, state, commit}, payload){
            try {
                const res = await axios.post('api/user/'+rootGetters.user.id+'/post/'+state.postChat.id+'/message',{
                    contact_id : payload.contact_id,
                    text: payload.text
                })

                commit('addPostMessage', res.data.data)

            } catch (error) {
                console.log(error)
            }
        },
        async getMessages({commit, rootGetters}, payload){
            try {
                const res = await axios.get('api/user/' + rootGetters.user.id + '/messages',{
                    params:{
                        post_type : payload.post_type
                    }
                });
                commit('setMessages', res.data)
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        },
    },
    getters:{
        postMessages : (state) => state.postMessages,
        postChat : (state) => state.postChat,
        messages: (state) =>state.messages,
        isReplying: (state) => state.isReplying,
        contact_id: (state) => state.contact_id,

    }
}

export default chat