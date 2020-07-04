<template>
  <div>
      <ul class="list-group">
          <li v-for="message in messages" :key='message.id' class="list-group-item d-flex" style="cursor:pointer" @click="openChat(message)">
              <img :src="baseUrl + message.post.images[0].photo_url" alt="" width="100" height="100">
              <div class="ml-4">
                <h3>{{message.post.user_id === user.id ? message.from.username : message.to.username}}</h3>
                <p>{{message.text}}</p>
                <button class="btn btn-primary" v-if="message.transaction.status != 0">{{message.transaction.status == 1 ? 'On Going Deal' : message.transaction.status == 2 ? 'Sold' : ''}}</button>
              </div>

          </li>
      </ul>
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
            this.$store.commit('contact', message.post.user.id != this.user.id ? message.post.user.id : message.from.id)
            console.log(message.transaction.id)
            this.$store.commit('transaction_status', message.transaction.status)
            this.$store.commit('setTransactionId', message.transaction.id)

            this.$router.push('/chat')
        }
    }

}
</script>

<style scoped>

</style>