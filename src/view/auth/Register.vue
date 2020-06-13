<template>
  <div class="container">
  <div class="row h-100 justify-content-center align-items-center">
    <form class="col-md-4" @submit.prevent="register">
      <div class="alert alert-danger" v-if="errors" >
        <ul v-for="items in errors" :key="items.id">
          <li v-for="error in items" :key="error.id">{{error}}</li>
        </ul>
      </div>
      <div class="alert alert-success" v-if="message">{{message}}</div>
      <div class="card">
        <div class="card-header">Register</div>
        <div class="card-body">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Username" v-model="username" required>
          </div>
          <div class="form-group">
            <input type="email" class="form-control" placeholder="Email" v-model="email" required>
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" v-model="password" required>
          </div>
           <div class="form-group">
            <input type="date" class="form-control" placeholder="Birthday" v-model="date_of_birth" required>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary float-right">Register</button>
        </div>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed:mapGetters(['errors', 'message']),
  data(){
    return {
      username: '',
      email: '',
      password: '',
      date_of_birth: ''
    }
  },
  methods:{
    register(){
      this.$store.dispatch('register', {email : this.email, password : this.password, username: this.username, date_of_birth: this.date_of_birth})
    }
  },
  mounted(){
    this.$store.commit('setErrors', '')
    this.$store.commit('setMessage', '')
  }
}
</script>

<style scoped>
.container{
   height:80vh;
}
</style>