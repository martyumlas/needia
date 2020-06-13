import axios from "axios"

const utility = {
    state:{
        types: [],
        categories: [],
        typeId: ''
    },
    mutations:{
        setTypes: (state, types) => state.types = types,
        setCategories: (state, categories) => state.categories = categories,
        setTypeId :(state, id) => state.typeId = id
    },
    actions:{
        async getOfferTypes({commit}){
            try {
                const res = await axios.get('api/offer-types')
                commit('setTypes', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getNeedTypes({commit}){
            try {
                const res = await axios.get('api/need-types')
                commit('setTypes', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getCategories({commit}, id){
            try {
                const res = await axios.get('api/offer-need/' + id + '/categories')
                commit('setCategories', res.data)
                commit('setTypeId', id)
            } catch (error) {
                console.log(error)
            }
        }
    },
    getters:{
        types : (state) => state.types,
        categories : (state) => state.categories,
        typeId: (state) => state.typeId
    }
}

export default utility