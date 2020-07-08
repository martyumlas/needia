<template>
  <div class="container mt-5">
      <ul class="list-group">
          <li v-for="message in messages" :key='message.id' class="list-group-item d-flex" style="cursor:pointer" @click="openChat(message)">
              <img :src="baseUrl + message.post.images[0].photo_url" alt="" width="100" height="100">
              <div class="ml-4">
                 <h3>{{message.transaction.user_id === user.id ? message.transaction.another_user.username : message.transaction.user.username}}</h3>
                <p>{{message.text}}</p>
                <button class="btn btn-primary" v-if="message.transaction.status != 0">{{message.transaction.status == 1 ? 'On Going Deal' : message.transaction.status == 2 ? 'Sold' : ''}}</button>
              </div>
          </li>
      </ul>
    <div class="text-center mt-5">
    <button class="btn btn-primary" @click="markAllAsSold">mark all as sold</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:mapGetters(['messages', 'baseUrl', 'user']),
    methods:{
        openChat(message){
            this.$store.commit('setPost', message.post)
            this.$store.commit('reply', true)
            this.$store.commit('contact',  message.post.user.id != this.user.id ? message.post.user.id : message.transaction.another_user.id)
            console.log(message.transaction.id)
            this.$store.commit('transaction_status', message.transaction.status)
            this.$store.commit('setTransactionId', message.transaction.id)
            this.$router.push('/chat')
        },
        markAllAsSold(){
          this.$store.dispatch('markAllAsSold')
        }
    },
    mounted(){
        this.$store.dispatch('postMessages')
    }

}
</script>

<style scoped>

</style>