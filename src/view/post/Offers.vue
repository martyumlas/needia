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
    this.$store.commit('setPostType', 1)
    // this.$store.dispatch('getPosts')
    this.$store.dispatch('fetchPost')
  }
}
</script>

<style>

</style>