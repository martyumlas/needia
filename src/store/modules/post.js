import axios from 'axios'
import router from '../../router'
const post = {
    state:{
        postType: '',
        usersPost: [],
        post: '',
        isEditing: false,
        posts:[],
        searchString: '',
        searchCategory: '',
        searchCategoryId: '',
        searchSubCategory: '',
        loading: false,
        searchSubCategoryId : '',
        searches: [],
        sortBy: '',
        sortDirection : 'ASC',
        filterType : '1',
        users : [],
        condition: '',
        mode_of_shipping: '',
        mode_of_payment : '',
        min_price : '',
        max_price : '',
        city: '',
        distance: '',
        relatedPosts : [],
        latestFinds : [],
        latitude: '',
        longtitude: ''
    },
    mutations:{
        setPostType:(state, type) => state.postType = type,
        setUsersPost:(state, post) => state.usersPost = post,
        setPost:(state, post) => state.post = post,
        isEditing:(state,status) => state.isEditing = status,
        setSearchString: (state, string) => state.searchString = string,
        setSearchSubCategories: (state, subcategory) => state.searchSubCategory = subcategory,
        setSearchCategory: (state, category) => state.searchCategory = category,
        setPosts: (state, posts) => state.posts = posts,
        setLoader: (state, status) => state.loading = status,
        setSearchCategoryId : (state, id) => state.searchCategoryId = id,
        setSearchSubCategoriesId : (state, id) => state.searchSubCategoryId = id,
        setRecentSearches : (state, searches) => state.searches = searches,
        setSortBy : (state, sortBy) => state.sortBy = sortBy,
        setSortDirection : (state, sortDirection) => state.sortDirection = sortDirection,
        setFilterType : (state, type) => state.filterType = type,
        setUsers : (state, users) => state.users = users,
        setCondition : (state, condition) => state.condition = condition,
        setModeOfShipping : (state, shipping) => state.mode_of_shipping = shipping,
        setModeOfPayment : (state, payment) => state.mode_of_payment = payment,
        setMinPrice : (state, price) => state.min_price = price,
        setMaxPrice : (state, price) => state.max_price = price,
        setCity : (state, city) => state.city = city,
        setDistance : (state, distance) => state.distance = distance,
        setRelatedPosts : (state, posts) => state.relatedPosts = posts,
        setLatestFinds : (state, posts) => state.latestFinds = posts,
        setLat : (state, lat) => state.latitude = lat,
        setLong : (state, long) => state.longtitude = long
    },
    actions:{
        async fetchPost({commit, rootGetters, state}, payload){
            commit('setLoader', true)
            try {
                if(rootGetters.user){
                    const res = await axios.get('api/post-offers-needs?'+  payload.title + '=' + payload.page, {
                        params: {
                            user_id :  rootGetters.user.id,
                            post_type : state.postType
                        }
                    })

                    commit('setPosts', res.data.top_picks)
                    commit('setRelatedPosts', res.data.by_category_picks)
                    commit('setLatestFinds', res.data.latest_finds)
                    commit('setLoader', false)
                    console.log(res.data)
                }else{
                    commit('setLoader', true)
                    const res = await axios.get('api/post-offers-needs?'+  payload.title + '=' + payload.page, {
                        params: {
                            post_type : state.postType
                        }
                    })
                    commit('setPosts', res.data.top_picks)
                    commit('setLoader', false)
                }

            } catch (error) {
                console.log(error.response)
            }
        },
        async getNeeds({commit}){
            try {
                const res = await axios.get('api/post-needs')
                commit('setPosts', res.data)

            } catch (error) {
                console.log(error)
            }
        },
        async getUsersPost({commit, rootGetters}, payload){
            commit('setLoader', true)
            try {
                const res = await axios.get('api/post/user/' + rootGetters.user.id + '?page=' + payload.page, {
                    params:{
                        post_type : payload.id,
                        is_published: payload.is_published
                    }
                })
                commit('setUsersPost', res.data)
                commit('setLoader', false)
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

                form.delete('bookmarks')
                form.delete('transactions')
                form.delete('boost')
                form.append('_method', 'PATCH')
                form.delete('created_at')
                form.delete('updated_at')
                form.delete('user')
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
        async getPost({commit, dispatch}, id){
            commit('setMessage', '')
            commit('setErrors', '')
            commit('setLoader', true)
            try {
                const res = await axios.get('api/post/' + id)

                commit('setPost', res.data)
                commit('setTypeId', res.data.offer_need_type_id)

                dispatch('postMessages')

                commit('setLoader', false)

            } catch (error) {
                console.log(error)
            }
        },
        async bookmark({commit, rootGetters, dispatch, state}, payload){
            commit('setMessage', '')
            try {
                const res = await axios.post('api/post/' + payload.id + '/user/' + rootGetters.user.id + '/bookmark', {bookmark:  payload.bookmark})
                console.log(res.data)
                commit('setMessage', res.data.message)
                if(state.postType == 1){
                    // router.push('/saved-offers')
                }else{
                    // router.push('/saved-needs')
                }
                dispatch('getBookmarkedPosts')
                dispatch('getPost', payload.id)
                console.log(res.data.message)
            } catch (error) {
                console.log(error)
            }
        },
        async getBookmarkedPosts({commit, rootGetters}, payload){
            try {
                const res = await axios.get('api/user/'+ rootGetters.user.id +'/post-bookmarks', {
                    params:{
                        page: payload.page,
                        post_type : payload.id
                    }
                })
                commit('setPosts', res.data)
            } catch (error) {
                console.log(error)
            }
        },

        async getPosts({commit, state, dispatch, rootGetters}, page){
            //commit('setLoader', true)
            try {
                const res = await axios.get('api/posts?page=' + page, {
                    params:{
                        filter_type: state.filterType,
                        post_type : state.postType,
                        query: state.searchString,
                        sub_category_id : state.searchSubCategoryId,
                        category_id : state.searchCategoryId,
                        sortBy: state.sortBy,
                        sortDirection: state.sortDirection,
                        condition: state.condition,
                        mode_of_shipping: state.mode_of_shipping,
                        mode_of_payment: state.mode_of_payment,
                        min_price: state.min_price,
                        max_price: state.max_price,
                        city: state.city,
                        distance: state.distance,
                        latitude : state.latitude,
                        longitude : state.longtitude
                    }
                })

                if(rootGetters.user && state.searchString || state.searchSubCategoryId || state.searchCategoryId){
                    dispatch('postSearch')
                }
                console.log(res.data)

                if(state.filterType > '1'){
                    commit('setUsers', res.data)
                  //  commit('setLoader', false)
                }else{
                    commit('setPosts', res.data)
                    console.log(res.data)
                   // commit('setLoader', false)
                }

            // commit('setLoader', false)
            } catch (error) {
                console.log(error)
            }
        },
        async postSearch({rootGetters, state}){
            try {
                if(rootGetters.user){
                     await axios.post('/api/user/' + rootGetters.user.id + '/search', {
                        query : state.searchString,
                        subcategory_id : state.searchSubCategoryId,
                        post_type : state.postType,
                        category_id: state.searchCategoryId
                    })
                }

            } catch (error) {
                console.log(error )
            }
        },
        async getSearches({rootGetters, commit}){
            try {
                if(rootGetters.user){
                const res = await axios.get('/api/user/' + rootGetters.user.id + '/search')

                commit('setRecentSearches', res.data)
                }
            } catch (error) {
                console.log(error )
            }
        },
        async deleteSearch({dispatch}, id){
            try {
                await axios.delete('api/' + 'search/' + id)
                dispatch('getSearches');
            } catch (error) {
                console.log(error )
            }
        },
        async autocomplete({commit}, payload){
            commit('setMessage', '')
            try {
                const res = await axios.get('api/post-autocomplete', {
                    params:{
                        query : payload
                    }
                })

                commit('setRecentSearches', res.data)

            } catch (error) {
                console.log(error)
            }
        }
    },
    getters:{
        offers: (state) => state.offers,
        needs: (state) => state.needs,
        postType: (state) => state.postType,
        usersPost: (state) => state.usersPost,
        post: (state) => state.post,
        isEditing : (state) => state.isEditing,
        posts: (state) => state.posts,
        searchString :(state) => state.searchString,
        loading: (state) => state.loading,
        searchCategory : (state) => state.searchCategory,
        searchSubCategory : (state) => state.searchSubCategory,
        searches: (state) => state.searches,
        sortBy:(state) => state.sortBy,
        users: (state) => state.users,
        filterType : (state) => state.filterType,
        relatedPosts : (state) => state.relatedPosts,
        latestFinds : (state) => state.latestFinds,
    }
}

export default post;