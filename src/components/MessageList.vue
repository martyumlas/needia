<template>
  <div>
      <ul v-for="message in messages" :key="message.id" class="list-group">
          <li class="list-group-item d-flex" style="cursor:pointer" @click="handleConvo(message)">
                <img :src="baseUrl + message.post.images[0].photo_url" alt="" width="100" height="100" class="mr-3">
                <div>
                    <h5>{{message.from.username}}</h5>
                    <p>{{message.text}}</p>
                </div>
          </li>
      </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: mapGetters(['messages', 'baseUrl', 'user']),
    methods:{
        handleConvo(message){
            console.log(message)
            this.$store.commit('setChatPost', message.post)
            this.$store.commit('isReplying', true)
            this.$store.commit('contact_id', message.from.id)
            this.$router.push('/chat')
        }
    }
}
</script>

<style>

</style>