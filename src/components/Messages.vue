<template>
   <div class="container">
    <div class="row">
      <div class="col-lg-3">

        <h1 class="my-4"></h1>
        <div class="list-group">
          <router-link to="/messages" class="list-group-item">My Offers Messages</router-link>
          <router-link to="/need-messages" class="list-group-item">My Needs Messages</router-link>
        </div>

      </div>

      <div class="col-lg-9 mb-5 mt-4" >
        <router-view></router-view>
      </div>

  </div>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>