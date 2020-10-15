<template>
<div class="container">
  <div class="row">
      <Categories/>
      <div class="col-lg-9" >
        <Loader v-if="loading" />
          <div v-else class="my-3">

            <FilterPost v-if="searchString || searchCategory"/>

            <p class="searches" v-if="searchString">
              <span class="badge badge-secondary">{{searchString}}
              <button class="ml-2 close" @click="clearSearch">&times;</button>
              </span>
            </p>
            <p class="searches" v-if="searchCategory">
              <span class="badge badge-secondary">{{searchCategory}}
              <button class="ml-2 close" @click="clearCat">&times;</button>
              </span>
            </p>
            <p class="searches" v-if="searchSubCategory">
              <span class="badge badge-secondary">{{searchSubCategory}}
              <button class="ml-2 close" @click="clearSubCat">&times;</button>
              </span>
            </p>

          <div v-if="filterType === '1'">

            <div v-if="user">
              <Loader v-if="loading"/>
              <div v-else>
                <div v-if="!searchString && !searchCategory">
                  <PostContent @clickInsight="clickInsight"  :posts='posts' :title="'Top Picks'" :type='1'/>

                  <PostContent @clickInsight="clickInsight"  :posts='latestFinds' :title="'Latest Finds'" :type='1' />

                  <PostContent @clickInsight="clickInsight"  :posts='relatedPosts' @categoryPick='categoryPick'/>
                </div>
                <div v-else>
                  <Loader v-if="loading"/>
                  <div v-else>
                    <PostContent @clickInsight="clickInsight"  :posts='posts' @changePage='changePage'  :type='3'/>
                  </div>

                </div>

              </div>

            </div>
            <div v-else>
               <PostContent @clickInsight="clickInsight"  :posts='posts' @topPicks='topPicks'  :type='2'/>
            </div>
          </div>
           <div  v-if="filterType > '1'">
            <Users/>
          </div>

          <!-- <div class="row container" v-if="!post.length">
            <h2 v-if="searchString">NO LISTING FOUND FOR {{searchString}}</h2>
            <h2 v-else>NO LISTING FOUND</h2>
          </div> -->
        </div>
      </div>
  </div>
</div>

</template>

<script>
import Categories from '../../components/Categories'
import { mapGetters } from 'vuex'
import Loader from '../../components/Loader'
import FilterPost from '../../components/Filter'
import Users from '../../components/Users'

import axios from 'axios'
import PostContent from '../../components/PostsContent'
export default {
    components:{Categories, Loader, FilterPost, Users, PostContent},
    computed:mapGetters(['posts','user', 'baseUrl', 'searchString', 'loading', 'searchSubCategory', 'users', 'filterType', 'postType', 'searchCategory', 'relatedPosts', 'latestFinds']),
    methods:{
      clickInsight(id) {
        axios.post('api/post/' + id + '/insights', {clicks: 1}).then(res => console.log(res.data))
        .catch(e => console.log(e))
        this.$router.push('/post/'+id)
      },
      categoryPick(page = 1) {
          this.$store.dispatch('fetchPost', {
          title: 'category_pick',
          page: page
        })
      },
       topPicks(page = 1) {
          this.$store.dispatch('fetchPost', {
          title: 'top_picks',
          page: page
        })
      },
      changePage(page = 1) {
          this.$store.dispatch('getPosts', page)
      },
      filterPost(){
        console.log('hello')
      },
      clearSubCat(){
        this.$store.commit('setSearchSubCategoriesId', '')
        this.$store.commit('setSearchSubCategories', '')
        this.$store.dispatch('fetchPost', {})

      },
      clearCat(){
        this.$store.commit('setSearchCategoryId', '')
        this.$store.commit('setSearchCategory', '')
        this.$store.dispatch('fetchPost', {})
      },
      clearSearch(){
        this.$store.commit('setSearchString', '')
        this.$store.dispatch('fetchPost', {})
        this.clearFilters()
      },
      clearFilters(){
        this.$store.commit('setSearchString', '')
        this.$store.commit('setSearchSubCategoriesId', '')
        this.$store.commit('setSearchSubCategories', '')
        this.$store.commit('setSearchCategoryId', '')
        this.$store.commit('setSearchCategory', '')
        this.$store.commit('setFilterType', '1')
        this.$store.commit('setUsers', '')
        this.$store.commit('setCondition', '')
        this.$store.commit('setRating', '')
        this.$store.commit('setModeOfShipping', '')
        this.$store.commit('setModeOfPayment', '')
        this.$store.commit('setMinPrice', '')
        this.$store.commit('setMaxPrice', '')
        this.$store.commit('setCity', '')
        this.$store.commit('setDistance', '')
        this.$store.commit('setSortBy', '')
        this.$store.commit('setSortDirection', '')
        this.$store.commit('setLat', '')
        this.$store.commit('setLong', '')

      }
    },
    mounted(){
      this.clearFilters()

    }
}
</script>

<style scoped>
i{
  cursor: pointer;
}
.searches{
  font-size: 3rem;
}
.highlight{
  border: 10px solid blue
}
</style>