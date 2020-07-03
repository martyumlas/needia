import axios from 'axios'

const chat = {
    state : {
        postMessages : [],
        messages : [],
        reply: false,
        contact : '',
        transaction_status : ''
    },
    mutations: {
        setPostMessages : (state, messages) => state.postMessages = messages,
        pushMessage : (state, message) => state.postMessages.push(message),
        setMessages : (state, messages) => state.messages = messages,
        reply : (state, status) => state.reply = status,
        contact : (state, contact) => state.contact = contact,
        transaction_status : (state, status) => state.transaction_status = status
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


                commit('transaction_status', res.data.transaction.status)
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
        },
        async postMessages({rootGetters, commit}){
            try {
                const res = await axios.get('api/user/'+rootGetters.user.id+'/post/'+rootGetters.post.id+'/message')

                commit('setMessages', res.data)

            } catch (error) {
                console.log(error)
            }
        },
        async proceedWithTheDeal({rootGetters, state, commit}){
            try {

                const res = await axios.post('api/post/'+rootGetters.post.id+'/proceed-with-the-deal',{
                    contact_id : state.contact
                })

                commit('transaction_status', res.data.data[0].status)

                console.log(res.data.data[0].status)

            } catch (error) {
                console.log(error)
            }
        },
        async markPostAsSold({rootGetters, state, commit}){
            try {

                const res = await axios.post('api/post/'+rootGetters.post.id+'/mark-as-sold',{
                    contact_id : state.contact
                })

                commit('transaction_status',res.data.data[0].status)

                console.log(res.data.data[0].status)

            } catch (error) {
                console.log(error)
            }
        },
    },
    getters:{
        postMessages : (state) => state.postMessages,
        messages : (state) => state.messages,
        transaction_status : (state) => state.transaction_status
    }
}

export default chat