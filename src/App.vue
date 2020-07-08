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
import Echo from 'laravel-echo';
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  components:{Navbar},
  computed:mapGetters(['baseUrl','user', 'basicAuth']),
  mounted(){
    // this.$store.dispatch('registerToken')
      window.Pusher = require('pusher-js');
    if(this.user){

      window.Echo = new Echo({
          broadcaster: 'pusher',
          key: '5f935cf5b004088ca696',
          cluster: 'ap1',
          encrypted: false,
          forceTLS: true,
          authEndpoint: this.baseUrl + 'broadcasting/auth',
          auth:{
            headers:{
                  Authorization : this.basicAuth,
            }
          }
      });
      window.Echo.private(`messages.${this.user.id}`)
          .listen('NewMessage', (e) => {
            setTimeout(() => {
               this.$store.commit('pushMessage', e.message)
               console.log(e.message)
            }, 1000)
      })

      window.Echo.private(`messages.${this.user.id}`)
          .listen('SystemMessage', (e) => {
            setTimeout(() => {
               this.$store.commit('pushMessage', e.message)
               console.log(e.message)
            }, 1000)
      })
    }

  }
}
</script>

<style>

body {
  padding-top: 56px;
  padding-bottom: 120px
}
</style>
