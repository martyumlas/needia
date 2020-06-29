import axios from 'axios'

const chat = {
    state : {
        postMessages : [],
        messages : [],
        reply: false,
        contact : '',
    },
    mutations: {
        setPostMessages : (state, messages) => state.postMessages = messages,
        pushMessage : (state, message) => state.postMessages.push(message),
        setMessages : (state, messages) => state.messages = messages,
        reply : (state, status) => state.reply = status,
        contact : (state, contact) => state.contact = contact
    },
    actions:{
        async getPostMessages({rootGetters, commit, state}){
            try {
                const res = await axios.get('api/user/'+rootGetters.user.id+'/post/'+rootGetters.post.id +'/messages',{
                    params:{
                        contact_id : state.reply ? state.contact : rootGetters.post.user.id
                    }
                })

                commit('setPostMessages', res.data)

            } catch (error) {

                console.log(error)
            }
        },
        async sendMessage({commit, rootGetters, state}, payload){
            try {
                const res = await axios.post('api/user/'+rootGetters.user.id+'/post/'+rootGetters.post.id +'/message', {
                    text : payload.text,
                    contact_id : state.reply ? state.contact : rootGetters.post.user.id
                })
                commit('pushMessage', res.data.data)

                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getMessages({rootGetters, commit}, payload){
            try {
                const res = await axios.get('api/user/'+rootGetters.user.id+'/messages',{
                    params:{
                        post_type : payload.post_type
                    }
                })
                commit('setMessages', res.data)

            } catch (error) {
                console.log(error)
            }
        }

    },
    getters:{
        postMessages : (state) => state.postMessages,
        messages : (state) => state.messages
    }
}

export default chat