<template>
  <div>
      <ul class="list-group">
          <li v-for="message in messages" :key='message.id' class="list-group-item" style="cursor:pointer" @click="openChat(message)">
              <img :src="baseUrl + message.post.images[0].photo_url" alt="" width="100" height="100">
              <!-- {{message.post.user.id != user.id ? message.post.user.username : message.from.username}} -->
                {{message.from == user.id ? message.to.username : message.from.username}}
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
            this.$router.push('/chat')
        }
    }

}
</script>

<style scoped>

</style>