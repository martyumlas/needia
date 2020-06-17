<template>
  <div >


    <form @submit.prevent="handleUpdatePassword">
      <div class="form-group">
        <label for="current_password">Current Password</label>
        <input type="password" class="form-control" id="current_password" placeholder="Date of Birth" v-model="current_password">
      </div>
      <div class="form-group">
        <label for="password">New Password</label>
        <input type="password" class="form-control" id="password" placeholder="Date of Birth" v-model="password">
      </div>
      <div class="form-group">
        <label for="password_confirmation">Confirm Password</label>
        <input type="password" class="form-control" id="password_confirmation" placeholder="Date of Birth" v-model="password_confirmation">
      </div>

      <button type="submit" class="btn btn-primary float-right">Update Profile</button>
    </form>

  </div>
</template>

<script>
export default {
  data(){
    return{

        current_password: '',
        password: '',
        password_confirmation: ''

    }
  },
  methods:{

      handleUpdatePassword(){
         this.$store.dispatch('updatePassword', {
             current_password: this.current_password,
             password : this.password,
             password_confirmation : this.password_confirmation
         })
      }
  }
}
</script>

<style scoped>

</style>