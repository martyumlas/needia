<template>
  <div>
      <ul class="list-group">
          <li v-for="message in messages.data" :key='message.id' class="list-group-item d-flex" style="cursor:pointer" @click="openChat(message)">
              <img :src="message.post.images[0] ? baseUrl + message.post.images[0].photo_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT7umTPgrLSV5xtD74U98xBYm2wQEi7RLNyotXacUjd1c3fhJyS&usqp=CAU'" alt="" width="100" height="100">
              <div class="ml-4">
                <h3>{{message.transaction.user_id === user.id ? message.transaction.another_user.username : message.transaction.user.username}}</h3>
                <p><strong>{{message.from.id == user.id ? 'You' : message.from.username}} </strong>: {{message.text}} {{message.created_at}}
                    <span v-if="!message.text && message.session.images">
                    send a image or file
                    </span>

                 </p>

                <button class="btn btn-primary" v-if="message.transaction.status != 0">{{message.transaction.status == 1 ? 'On Going Deal' : message.transaction.status == 2 ? 'Sold' : ''}}</button>
              </div>

          </li>
      </ul>
      <Pagination :data='messages'  @pagination-change-page="getMessages" v-if="messages"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from 'laravel-vue-pagination'
export default {
    components: {Pagination},
    props: ['id'],
    computed:mapGetters(['messages', 'baseUrl', 'user']),
    methods:{
        getMessages(page = 1) {
             this.$store.dispatch('getMessages', {post_type: this.id, page: page})
        },
        openChat(message){
            this.$store.commit('setPost', message.post)
            this.$store.commit('reply', true)
            this.$store.commit('contact', message.post.user.id != this.user.id ? message.post.user.id : message.transaction.another_user.id)
            this.$store.commit('transaction_status', message.transaction.status)
            this.$store.commit('setTransactionId', message.transaction.id)
            this.$router.push('/chat')
        },
    }

}
</script>

<style scoped>

</style>