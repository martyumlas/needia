<template>
   <div class="container">
    <div class="row">
      <div class="col-lg-3">

        <h1 class="my-4"></h1>
        <div class="list-group">
          <router-link to="/messages" class="list-group-item">Offers Messages</router-link>
          <router-link to="/need-messages" class="list-group-item">Needs Messages</router-link>

          <!-- <a href="#" class="list-group-item" @click="getMessages(1)">My Offer Messages</a>
          <a href="#" class="list-group-item" @click="getMessages(2)">My Needs Messages</a>
          <a href="#" class="list-group-item" @click="getMessages(3)">Other's Needs</a>
          <a href="#" class="list-group-item" @click="getMessages(4)">Other's Offers</a>
          <a href="#" class="list-group-item" @click="getMessages(5)">Completed Deals</a>
          <a href="#" class="list-group-item" @click="getMessages(6)">On Going Deals</a> -->
        </div>

      </div>

      <div class="col-lg-9 mb-5 mt-4" >
        <router-view></router-view>
          <!-- <MessageList :id='id'/> -->
      </div>

  </div>
</div>
</template>

<script>
// import MessageList from '../components/MessageList'
export default {
  data(){
    return{
      id: 1
    }
  },
  // components:{MessageList},
  methods:{
    getMessages(id){
       this.$store.dispatch('getMessages', {post_type: id, page: ''})
    }
  },
  mounted(){
    this.getMessages((this.id))
  }
}
</script>

<style>

</style>