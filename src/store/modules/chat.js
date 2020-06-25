import axios from 'axios'

const chat = {
    state : {
        postMessages : [],
        postChat: '',
        messages: '',
        isReply: false,
        contact_id: ''
    },
    mutations: {
        setChatPost: (state, post) => state.postChat = post,
        setPostMessages: (state, messages) => state.postMessages = messages,
        addPostMessage: (state, message) => state.postMessages.push(message),
        setMessages: (state, messages) => state.messages = messages,
        setIsReply : (state, status) => state.isReply = status,
        setContactId: (state, contact) => state.contact_id = contact

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
        async getMessages({commit, rootGetters}){
            try {
                const res = await axios.get('api/user/' + rootGetters.user.id + '/messages');
                commit('setMessages', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        setContactId({state, rootGetters, commit}){
          state.postMessages.filter(messages => {
                let contact = messages.from !== rootGetters.user.id ? messages.from: messages.to !== rootGetters.user.id ? messages.to : messages.from
                commit('setContactId', contact)
          })
        }
    },
    getters:{
        postMessages : (state) => state.postMessages,
        postChat : (state) => state.postChat,
        messages: (state) =>state.messages,
        isReply: (state) => state.isReply,
        contact_id : (state) => state.contact_id

    }
}

export default chat