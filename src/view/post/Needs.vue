<template>
  <Posts/>
</template>

<script>
import Posts from './Posts'
import {mapActions} from 'vuex'
export default {
  components: {Posts},
   methods:mapActions(['getNeeds']),
    mounted(){
      this.getNeeds();
    }
}
</script>

<style>

</style>