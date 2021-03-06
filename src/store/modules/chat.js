import axios from 'axios'

const chat = {
    state : {
        postMessages : [],
        messages : [],
        reply: false,
        contact : '',
        transaction_status : '',
        setTransactionNo : '',
        transaction_id : ''
    },
    mutations: {
        setPostMessages : (state, messages) => state.postMessages = messages,
        pushMessage : (state, message) => state.postMessages.push(message),
        setMessages : (state, messages) => state.messages = messages,
        reply : (state, status) => state.reply = status,
        contact : (state, contact) => state.contact = contact,
        transaction_status : (state, status) => state.transaction_status = status,
        setTransactionId : (state, id) => state.transaction_id = id,
        updateMessage: (state, updatedMessage) => {
            const index = state.postMessages.findIndex(message => message.id == updatedMessage.id)
            if(index !== -1){
                state.postMessages.splice(index, 1, updatedMessage)
            }
        }
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
        // async sendMessage({commit, rootGetters, state}, payload){
        //     try {
        //         const res = await axios.post('api/user/'+rootGetters.user.id+'/post/'+rootGetters.post.id +'/message', {
        //             text : payload.text,
        //             contact_id : state.reply ? state.contact : rootGetters.post.user.id
        //         })
        //         commit('pushMessage', res.data.data)
        //         commit('transaction_status', res.data.transaction.status)
        //     } catch (error) {
        //         console.log(error)
        //     }
        // },
         async sendMessage({commit, rootGetters, state}, payload){
            try {
              commit('setErrors', '')
              commit('setMessage', '')

                let form = new FormData

                for( var i = 0; i < payload.images.length; i++ ){
                let file = payload.images[i];

                form.append('images[' + i + ']', file);
                }

                for( var j = 0; j < payload.files.length; j++ ){
                    let file = payload.files[j];
                    form.append('files[' + j + ']', file);
                }

                form.append('text', payload.text)
                form.append('contact_id', state.reply ? state.contact : rootGetters.post.user.id )
                const res = await axios.post('api/user/'+rootGetters.user.id+'/post/'+rootGetters.post.id +'/message', form)

                // commit('pushMessage', res.data.data)
                commit('transaction_status', res.data.transaction.status)
                commit('setMessage', res.data.message)

            } catch (error) {
                commit('setErrors', error.response.data.errors);
            }
        },
        async getMessages({rootGetters, commit}, payload){
            try {
                const res = await axios.get('api/user/'+rootGetters.user.id+'/messages?page=' + payload.page,{
                    params:{
                        post_type : payload.post_type,
                        filter: payload.filter
                    }
                })
                commit('setMessages', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async postMessages({rootGetters, commit}){
            try {
                if(rootGetters.user){

                    const res = await axios.get('api/user/'+rootGetters.user.id+'/post/'+rootGetters.post.id+'/message')

                    commit('setMessages', res.data)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async proceedWithTheDeal({state, commit}){
            try {
                const res = await axios.post('api/transaction/'+state.transaction_id+'/proceed-with-the-deal',{
                    contact_id : state.contact,
                })
                commit('transaction_status', res.data.data.status)
            } catch (error) {
                console.log(error)
            }
        },
        async markPostAsSold({state, commit}){
            try {
                const res = await axios.post('api/transaction/'+state.transaction_id+'/mark-as-sold',{
                    contact_id : state.contact
                })
                commit('transaction_status', res.data.data.status)
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async cancelDeal({state, commit}){
            try {
                const res = await axios.post('api/transaction/'+state.transaction_id+'/cancel-deal',{
                    contact_id : state.contact
                })
                commit('transaction_status',res.data.data.status)
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async markAllAsSold({rootGetters, dispatch}){
            try {
                const res = await axios.post('api/user/'+rootGetters.user.id+'/post/'+rootGetters.post.id+'/mark-all-as-sold')
                dispatch('postMessages')
                console.log(res.data)

            } catch (error) {
                console.log(error)
            }
        },
    },
    getters:{
        postMessages : (state) => state.postMessages,
        messages : (state) => state.messages,
        transaction_status : (state) => state.transaction_status,
        contact: (state) => state.contact
    }
}

export default chat