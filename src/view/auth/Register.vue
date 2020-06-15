<template>
  <div class="container">
  <div class="row h-100 justify-content-center align-items-center">
    <form class="col-md-4" @submit.prevent="register">
     <Errors/>
      <div class="alert alert-success" v-if="message">{{message}}</div>
      <div class="card">
        <div class="card-header">Register</div>
        <div class="card-body">
           <div class="form-group">
              <select id="fuel" class="form-control" v-model="account_type">
                <option value="" selected>Account Type</option>
                <option value="1">Personal</option>
                <option value="2">Business</option>
            </select>
          </div>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Username" v-model="username" required>
          </div>
          <div class="form-group">
            <input type="email" class="form-control" placeholder="Email" v-model="email" required>
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" v-model="password" required autocomplete="new-password">
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
import Errors from '../../components/Errors'
export default {
  computed:mapGetters(['errors', 'message']),
  components:{Errors},
  data(){
    return {
      username: '',
      email: '',
      password: '',
      date_of_birth: '',
      account_type: '',
    }
  },
  methods:{
    register(){
      this.$store.dispatch('register', {email : this.email, password : this.password, username: this.username, date_of_birth: this.date_of_birth, account_type: this.account_type})
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