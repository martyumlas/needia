<template>
  <div class="container">
  <div class="row h-100 justify-content-center align-items-center">

    <form class="col-md-4" @submit.prevent="resetPassword">
       <Errors/>
      <div class="alert alert-success" v-if="message">{{message}}</div>
      <div class="card">
        <div class="card-header">Forgot Password</div>
        <div class="card-body">
          <div class="form-group">
            <input type="email" class="form-control" placeholder="Email" v-model="email" required>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary float-right">Reset Password</button>
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
    components:{Errors},
    data(){
        return{
            email: ''
        }
    },
    computed:mapGetters(['errors', 'message']),
    methods:{
        resetPassword(){
            this.$store.dispatch('resetPassword', {email: this.email})
        }
    }
}
</script>

<style scoped>
.container{
   height:80vh;
}
</style>