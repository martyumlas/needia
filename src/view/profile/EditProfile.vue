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
          <label for="date_of_birth">Shop Address</label>
          <input type="text" class="form-control" id="date_of_birth" placeholder="Location" v-model="updateUser.shop_address">
        </div>
        <div class="form-group">
          <label for="bio">Bio</label>
          <textarea class="form-control" v-model="updateUser.bio" placeholder="Bio" ></textarea>
        </div>

      <ul>
        <li v-for="(day, index) in activeDays" :key="index">
          <div class="form-group">
            <label for="">
            <input type="checkbox" @change="handleOnchange" :value="day.day" :id="index">
            {{day.day}}</label>
          </div>

            <input type="text" :id="'opening-'+ index" v-model="day.opening" >
            <input type="text" :id="'closing-' + index" v-model="day.closing" >
        </li>
      </ul>
    <div class="col-md-12">
        <div class="form-group">
          <img :src="docPreview" alt="" class="img-fluid mb-3" width="200" height="200" v-if="docPreview"><br>
          <input type="file"  @change="onDocChange">
        </div>
        <div class="form-group">
          <label for="">Document/Type</label>
          <input type="text" class="form-control" v-model="documents.type">
        </div>
        <div class="form-group">
          <label for="">Permit/Document Number</label>
          <input type="text" class="form-control" v-model="documents.number">
        </div>
      </div>
      <!-- <div class="row">
          <div class="col-md-12" v-for="doc in documents" :key="doc.id">
            <div class="form-group">
               <img :src="preview" alt="" class="rounded-circle">
              <input type="file" :id='doc.id' @change="onDocChange">
            </div>
            <div class="form-group">
              <label for="">Document/Type</label>
              <input type="text" class="form-control" v-model="doc.type">
            </div>
            <div class="form-group">
              <label for="">Permit/Document Number</label>
              <input type="text" class="form-control" v-model="doc.number">
            </div>
          </div>
          <button class="btn btn-primary" @click="addInput">Add</button>
      </div> -->
      <button type="submit" class="btn btn-primary float-right mt-4">Update Profile</button>


    </form>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return{
      image: '',
      preview: '',
      days:[],
      counter: 0,
      docImage: '',
      docPreview:'',
      images: [],
      // documents: [{
      //   id: '0',
      //   number: '',
      //   type: '',
      //   img: '',
      // }],
      documents: {},

      activeDays: [
        {day: 'Sunday', opening: '7:00', closing: '7:00'},
        {day: 'Monday', opening: '7:00', closing: '7:00'},
        {day: 'Tuesday', opening: '7:00', closing: '7:00'},
        {day: 'Wednesday', opening: '7:00', closing: '7:00'},
        {day: 'Thursday', opening: '7:00', closing: '7:00'},
        {day: 'Friday', opening: '7:00', closing: '7:00'},
        {day: 'Saturday', opening: '7:00', closing: '7:00'},
      ]

    }
  },
  computed:{...mapGetters(['updateUser', 'baseUrl', ]),
    profileImage(){
      if(this.preview){
        return this.preview
      }
      return this.updateUser.photo_url ? this.baseUrl + this.updateUser.photo_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT7umTPgrLSV5xtD74U98xBYm2wQEi7RLNyotXacUjd1c3fhJyS&usqp=CAU'
    },

  },
  methods:{
    onDocChange(e) {
        // this.images.push(e.target.files[0])
        this.docImage = e.target.files[0]
        let reader = new FileReader();
        let vm = this;
        reader.onload = (e) => {
            vm.docPreview = e.target.result;
        };
        reader.readAsDataURL(this.docImage);
    },
     addInput(e) {
      e.preventDefault()
      this.documents.push({
        id: `${++this.counter}`,
        number: '',
        type: '',
      });
    },
    handleOnchange(e){
      if(e.target.checked){
        let day = {day: e.target.value, opening: document.querySelector('#opening-' + e.target.id).value, closing: document.querySelector('#closing-' + e.target.id).value, id: e.target.id}
          this.days.push(day)
          console.log(this.days)
      }else{
         this.days.splice(this.days.indexOf(e.target.id), 1);
         console.log(this.days)
      }
    },
    handleUpdateProfile(){

      this.$store.dispatch('updateUser', {user: this.updateUser, image: this.image, days: this.days, documents: this.documents, document_image : this.docImage})

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
ul{
  list-style-type:none ;
}
</style>