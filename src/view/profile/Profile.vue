<template>
  <div class="container">
  <div class="row">
      <div class="col-lg-3">

        <h1 class="my-4"></h1>
        <div class="list-group">
          <router-link to="/profile" class="list-group-item">My Offers</router-link>
          <router-link to="/my-needs" class="list-group-item">My Needs</router-link>
          <router-link to="/create-offer" class="list-group-item" @click.native="setPostType(1)">Create Offer</router-link>
          <router-link to="/create-need" class="list-group-item" @click.native="setPostType(2)">Create Need</router-link>
          <router-link to="#" class="list-group-item">Edit Profile</router-link>
        </div>

      </div>

      <div class="col-lg-9 my-5">
        <router-view></router-view>
      </div>

  </div>
</div>
</template>

<script>
export default {
  methods:{
    setPostType(id){
      this.$store.commit('setPostType', id)
    }
  }
}
</script>

<style scoped>

</style>