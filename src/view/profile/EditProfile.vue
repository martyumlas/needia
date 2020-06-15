<template>
  <div >

    <div class="jumbotron d-flex justify-content-center align-items-center">
      <label for="image">
        <img :src="profileImage" alt="" class="rounded-circle">
      </label>
    </div>

    <form @submit.prevent="handleUpdateProfile">
      <input type="file" style="display:none" id="image" @change="onImageChange">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail4">Email</label>
          <input type="email" class="form-control" id="inputEmail4" placeholder="Email" v-model="updateUser.email">
        </div>
        <div class="form-group col-md-6">
          <label for="username">Username</label>
          <input type="text" class="form-control" id="username" placeholder="Username" v-model="updateUser.username">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="first_name">First Name</label>
          <input type="text" class="form-control" id="first_name" placeholder="First Name" v-model="updateUser.first_name">
        </div>
        <div class="form-group col-md-6">
          <label for="last_name">Last Name</label>
          <input type="text" class="form-control" id="last_name" placeholder="Last Name" v-model="updateUser.last_name">
        </div>
      </div>
      <div class="form-group">
        <label for="date_of_birth">Date of Birth</label>
        <input type="date" class="form-control" id="date_of_birth" placeholder="Date of Birth" v-model="updateUser.date_of_birth">
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="mobile">Mobile</label>
          <input type="text" placeholder="Mobile" class="form-control" id="mobile" v-model="updateUser.mobile">
        </div>
         <div class="form-group col-md-6">
          <label for="telephone">Telephone</label>
          <input type="text" placeholder="Telephone" class="form-control" id="telephone" v-model="updateUser.telephone">
        </div>
      </div>

        <div class="form-group">
          <label for="date_of_birth">Location</label>
          <input type="text" class="form-control" id="date_of_birth" placeholder="Location" v-model="updateUser.location">
        </div>
        <div class="form-group">
          <label for="bio">Bio</label>
          <textarea class="form-control" v-model="updateUser.bio" placeholder="Bio" ></textarea>
        </div>
      <button type="submit" class="btn btn-primary float-right">Update Profile</button>
    </form>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return{
      image: '',
      preview: ''

    }
  },
  computed:{...mapGetters(['updateUser', 'baseUrl', ]),
    profileImage(){
      if(this.preview){
        return this.preview
      }
      return this.updateUser.photo_url ? this.baseUrl + this.updateUser.photo_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT7umTPgrLSV5xtD74U98xBYm2wQEi7RLNyotXacUjd1c3fhJyS&usqp=CAU'
    }
  },
  methods:{
    handleUpdateProfile(){
      this.$store.dispatch('updateUser', {user: this.updateUser, image: this.image})
    },
    onImageChange(e){
      this.image = e.target.files[0]
      let reader = new FileReader();
      let vm = this;
      reader.onload = (e) => {
          vm.preview = e.target.result;
      };
      reader.readAsDataURL(this.image);

    },
    mounted(){
    }

  }
}
</script>

<style scoped>
textarea{
  resize: none;
}
img{
  cursor: pointer;
  height: 200px;
}
</style>