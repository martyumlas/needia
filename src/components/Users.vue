<template>
  <div>
     <ul class="list-group">
         <li class="list-group-item d-flex" v-for="user in users.data" :key="user.id">
             <img :src="user.photo_url ? baseUrl + user.photo_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT7umTPgrLSV5xtD74U98xBYm2wQEi7RLNyotXacUjd1c3fhJyS&usqp=CAU'" alt="" width="100" height="100">
             <div class="ml-4">

                <a href="">{{user.username}}</a>
                <p>{{user.rating}}</p>
             </div>
         </li>
     </ul>
     <Pagination :data="users" @pagination-change-page="getResult" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: mapGetters(['users', 'baseUrl']),
    methods: {
         getResult(page = 1) {
            this.$store.dispatch('fetchPost', page)
        },
    }
}
</script>

<style>

</style>