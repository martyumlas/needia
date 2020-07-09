<template>
  <!-- <div class="alert alert-success">
      {{message.message}}
  </div> -->
   <div class="alert alert-success" v-if="message">{{message}}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="clearMessage">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:mapGetters(['message']),
    methods:{
       clearMessage(){
        this.$store.commit('setMessage', '')
      },
    }
}
</script>

<style>

</style>