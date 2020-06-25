<template>
 <div>
    <div class="card card-body text-center" v-for="message in messages" :key="message.id" @click="handleMessages(message)" style="cursor:pointer">
        <h5 class="card-title">{{message.from.id === user.id ? message.to.username: message.from.username}}</h5>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:mapGetters(['messages', 'user']),
    methods:{
        handleMessages(message){
            this.$store.commit('setChatPost', message.post)
            this.$router.push('/chat')
            this.$store.commit('setIsReply' , true)
        }

    },
    mounted(){
        this.$store.dispatch('getMessages')
    }
}
</script>

<style>

</style>