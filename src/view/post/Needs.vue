<template>
    <Posts/>
</template>

<script>
import Posts from './Posts'
import { mapGetters } from 'vuex'
export default {
  components: {Posts},
  computed:mapGetters(['postType']),
  mounted(){
    this.$store.commit('setPostType', 2)
      this.$store.dispatch('getPosts')
  }
}
</script>

<style>

</style>