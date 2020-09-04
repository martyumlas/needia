<template>
  <div class="container">
  <div class="row">
      <div class="col-lg-3">

        <h1 class="my-4"></h1>
        <div class="list-group">
          <router-link to="/profile" class="list-group-item" @click.native="setPostType(1)">My Offers</router-link>
          <router-link to="/my-needs" class="list-group-item" @click.native="setPostType(2)">My Needs</router-link>
          <router-link to="/reviews" class="list-group-item">Reviews</router-link>
          <router-link to="/create-offer" class="list-group-item" @click.native="setPostType(1)">Create Offer</router-link>
          <router-link to="/create-need" class="list-group-item" @click.native="setPostType(2)">Create Need</router-link>
          <router-link to="/edit-profile" class="list-group-item" @click.native='getUser'>Edit Profile</router-link>
          <router-link to="/saved-offers" class="list-group-item"  @click.native="setPostTypeBookmarks(1)">Saved Offers</router-link>
          <router-link to="/saved-needs" class="list-group-item" @click.native="setPostTypeBookmarks(2)">Saved Needs</router-link>
          <router-link to="/update-password" class="list-group-item">Update Password</router-link>
          <a href="#" data-toggle="modal" data-target="#subscription" class="list-group-item">Subscription</a>
        </div>
        <SubscriptionModal/>
      </div>

      <div class="col-lg-9 mb-5 mt-4" >
        <Message/>
        <Errors/>
        <router-view></router-view>
      </div>

  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Errors from '../../components/Errors'
import Message from '../../components/Message'
import SubscriptionModal from '../../components/SubscriptionModal'
export default {
  computed:mapGetters(['message', 'user']),
  components:{Errors, Message, SubscriptionModal},
  methods:{
    setPostType(id){
      this.$store.commit('setPostType', id)
      this.$store.dispatch('getUsersPost', {id : id})
      this.$store.commit('setPost',[])
        this.$store.commit('isEditing', false)
    },
    clearMessage(){
      this.$store.commit('setMessage', '')
    },
    getUser(){
      this.$store.dispatch('getUser', this.user.id)
    },
    setPostTypeBookmarks(id){
       this.$store.commit('setPostType', id)
    }
  },
  mounted(){
    // this.$store.commit('setMessage', '')
  }
}
</script>

<style scoped>

</style>