<template>
  <div>
      <Posts :id='1'/>
  </div>
</template>

<script>
import Posts from './Posts'
export default {
    components:{Posts},

    mounted(){
      this.$store.dispatch('getBookmarkedPosts', {id: 1, page: ''})
    }
}
</script>

<style>

</style>