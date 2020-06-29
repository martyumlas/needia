<template>
  <div id="app">

    <Navbar/>


    <router-view></router-view>

  <!-- Footer -->
  <footer class="py-5 bg-dark fixed-bottom" style="margin-top:200px">
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
    // this.$store.dispatch('getOffers')
    // this.$store.dispatch('getToken')
    // this.$store.dispatch('registerToken')
  }
}
</script>

<style>

body {
  padding-top: 56px;
  padding-bottom: 120px
}
</style>
