<template>
  <div id="app">

    <Navbar/>


      <router-view></router-view>

  <!-- Footer -->
  <footer class="py-5 bg-dark">
    <div class="container">
      <p class="m-0 text-center text-white">Copyright &copy; Your Website 2019</p>
    </div>
    <!-- /.container -->
  </footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components:{Navbar},
  mounted(){
    this.$store.dispatch('getOffers')
  }
}
</script>

<style>

body {
  padding-top: 56px;
}
</style>
