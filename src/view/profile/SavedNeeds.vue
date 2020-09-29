<template>
  <div>
      <Posts :id='2'/>
  </div>
</template>

<script>
import Posts from './Posts'
export default {
    components:{Posts},

    mounted(){
      this.$store.dispatch('getBookmarkedPosts', {id: 2, page: ''})
    }
}
</script>

<style>

</style>