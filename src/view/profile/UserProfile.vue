<template>
<div>
  <div class="jumbotron d-flex justify-content-center">
    <div>
       <img :src="profile.photo_url ? baseUrl + profile.photo_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT7umTPgrLSV5xtD74U98xBYm2wQEi7RLNyotXacUjd1c3fhJyS&usqp=CAU'" alt="" class="rounded-circle" style="height: 200px">
      <h3 class="text-center pt-3">{{profile.username}}</h3>
    </div>
  </div>
  <div class="container">
     <ul class="nav" v-if="profile.id !== user.id">
        <li class="nav-item">
          <a class="nav-link active" href="#">Bookmark</a>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" href="#" :to="{name : 'ReportProfile', id: profile.id }">Report</router-link>
        </li>
      </ul>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
          <h2>Active Hours</h2>
          <ul>
            <li v-for="day in profile.active_hours" :key="day.id">
              {{day.day}}
              <span>{{day.opening}}</span> to <span>{{day.closing}}</span>
            </li>
          </ul>
      </div>
       <div class="col-md-6">
         <h2>Business License</h2>
         <ul >
          <li v-for="doc in profile.documents" :key="doc.id">
            {{doc.type}}
            <img :src="baseUrl + doc.photo_url" alt="" width="200" height="200">
          </li>
        </ul>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:mapGetters(['profile', 'baseUrl', 'user', 'baseUrl']),
    mounted(){
      this.$store.dispatch('getUserProfile', this.$route.params.id)
    },
    methods:{
      reportUser() {

      }
    }

}
</script>

<style scoped>
i{
  cursor: pointer;
}
</style>