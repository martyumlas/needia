<template>
  <div class="jumbotron d-flex justify-content-center">
    <div>
          <span class="d-flex justify-content-end" v-if="!profile.bookmarks.length">
              <i class="material-icons" @click="handleBookmark(profile)">bookmark</i>
            </span>
            <span class="d-flex justify-content-end"  v-for="bookmark in profile.bookmarks" :key="bookmark.id" v-else>
              <i class="material-icons" :class="{'text-danger' : bookmark.user_id === user.id ?  bookmark.is_bookmarked : ''}" @click="handleBookmark(profile)">bookmark</i>
            </span>
       <img :src="profile.photo_url ? baseUrl + profile.photo_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT7umTPgrLSV5xtD74U98xBYm2wQEi7RLNyotXacUjd1c3fhJyS&usqp=CAU'" alt="" class="rounded-circle" style="height: 200px">
      <h3 class="text-center pt-3">{{profile.username}}</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:mapGetters(['profile', 'baseUrl', 'user']),
    mounted(){
      this.$store.dispatch('getUserProfile', this.$route.params.id)
    },
    methods:{
      handleBookmark(profile){
         if(profile.bookmarks.length){
          profile.bookmarks.filter(bookmark => {
            if(bookmark.user_id == this.user.id){
              this.$store.dispatch('bookmarkUser', {
                user_id: profile.id,
                bookmark: !bookmark.is_bookmarked
              })
            }
          })
        }else{
           this.$store.dispatch('bookmarkUser', {
            user_id: profile.id,
            bookmark: 1
          })
        }
      }
    }

}
</script>

<style scoped>
i{
  cursor: pointer;
}
</style>