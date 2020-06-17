<template>
  <div>
      <Posts/>
  </div>
</template>

<script>
import Posts from './Posts'
export default {
    components:{Posts},

    mounted(){
      this.$store.dispatch('getBookmarkedPosts', 2)
    }
}
</script>

<style>

</style>