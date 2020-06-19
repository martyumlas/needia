<template>
  <div>

    <div class="form-group">
        <label for="categories">Category</label>
        <select id="categories" class="form-control"  required v-model="selectedFilter" @change="filterPost">
            <option value="">All</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
        </select>
    </div>
    <UsersPosts/>
  </div>
</template>

<script>
import UsersPosts from './UsersPosts'
export default {
  data(){
    return {
      selectedFilter : ''
    }
  },
  methods:{
    filterPost(){
      this.$store.dispatch('getUsersPost', {id: 2, is_published: this.selectedFilter})
    }
  },
  components:{UsersPosts},
    mounted(){
    this.$store.dispatch('getUsersPost', {id: 2})
      this.$store.commit('setPostType', 2)
  }
}
</script>

<style>

</style>