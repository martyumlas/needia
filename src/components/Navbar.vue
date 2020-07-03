<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">Needia</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
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
  computed: mapGetters(['isLoggedIn', 'user']),
  methods:{

    handleLogout(){
      let result = confirm('Are you sure?')

      if(result){
        this.$store.dispatch('logout')
      }

    }


  }
}
</script>

<style>

</style>