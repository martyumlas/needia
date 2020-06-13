<template>
  <div class="container">
  <div class="row h-100 justify-content-center align-items-center">
    <form class="col-md-4" @submit.prevent="login">
      <div class="alert alert-danger" v-if="errors">{{errors}}</div>
      <div class="card">
        <div class="card-header">Login</div>
        <div class="card-body">
          <div class="form-group">
            <input type="email" class="form-control" placeholder="Email" v-model="email" required>
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" v-model="password" required>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary float-right">Login</button>
        </div>
      </div>
      <div class="text-center mt-4">
        <router-link to="/forgot-password" >Forgot Password</router-link>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed:mapGetters(['errors']),
  data(){
    return {
      email: '',
      password: ''
    }
  },
  methods:{
    login(){
      this.$store.dispatch('login', {email : this.email, password : this.password})
      this.$store.commit('setPassword', this.password)
    }
  }
}
</script>

<style scoped>
.container{
   height:80vh;
}
</style>