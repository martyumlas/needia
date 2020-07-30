<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <router-link class="navbar-brand" to="/">Needia</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <form class="form-inline my-2 my-lg-0" @submit.prevent="handleSearch">
           <div class="dropdown">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="dropdownMenuLink" data-toggle="dropdown"  v-model="search_string" @keyup="handleSearchString" @click="showRecentSearches">
          <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" style="width:500px">
            <p href="#" class="ml-4">recent searches</p>
            <ul class="list-group">
              <li v-for="query in searches" :key="query.id" class="list-group-item d-flex">
                <a class="dropdown-item" href="#" @click="setQuery(query)">{{query.query}}</a>
                <button class="close" @click="deleteQuery(query.id)">&times;</button>
              </li>
            </ul>

          </div>
        </div>
        </form>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
             <router-link class="nav-link" to="/">Offers</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/needs">Needs</router-link>
          </li>
        </ul>

        <ul class="navbar-nav" v-if="!isLoggedIn">
            <li class="nav-item">
                <router-link class="nav-link" to="/register">Register</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/login">Login</router-link>
            </li>
        </ul>
        <ul class="navbar-nav" v-else>
            <li class="nav-item">
               <router-link class="nav-link" to="/messages">Messages</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{user.username}}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" to="/profile">Profile</router-link>
                <a class="dropdown-item" href="#" @click="handleLogout">Logout</a>
              </div>
            </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: mapGetters(['isLoggedIn', 'user', 'searches']),
  data(){
      return{
        search_string : ''
      }
    },
  methods:{
    handleSearch(){
        this.$store.dispatch('getPosts')
    },
    handleSearchString(){
        this.$store.commit('setSearchString', this.search_string)
    },
    handleLogout(){
      let result = confirm('Are you sure?')

      if(result){
        this.$store.dispatch('logout')
      }

    },
    showRecentSearches(){
     this.$store.dispatch('getSearches')
    },
    setQuery(query){
      this.search_string = query.query
      this.handleSearchString()
      this.handleSearch()
    },
    deleteQuery(id){
      this.$store.dispatch('deleteSearch', id)
    }


  }
}
</script>

<style>

</style>