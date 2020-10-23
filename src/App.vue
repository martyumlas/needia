<template>
  <div id="app">

    <Navbar/>


    <router-view></router-view>

  <!-- Footer -->
  <footer class="py-5 bg-dark fixed-bottom" style="margin-top:200px">
    <div class="container">
      <p class="m-0 text-center text-white">Copyright &copy; Your Website 2019</p>
      <div class="d-flex justify-content-around">
        <a :href="baseUrl + 'faq'" target="_blank">faq</a>
        <a :href="baseUrl + 'about-us'" target="_blank">about</a>
        <a :href="baseUrl + 'about-us#contact-us'" target="_blank">contact</a>
        <a :href="baseUrl + 'policies'" target="_blank">terms and policies</a>
        <a :href="baseUrl + 'policies#cookies'" target="_blank">data and Cookies Policy</a>
      </div>

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
  computed:mapGetters(['baseUrl','user', 'basicAuth', 'tokenRegistrationError', 'baseUrl']),
  methods:{
    register(){
      this.$store.dispatch('registerToken')
    },

  },
  mounted(){
    if(this.tokenRegistrationError != '') {
      this.register();
    }
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
              //  this.$store.commit('transaction_status', e.message.transaction.status)
              //  console.log(e.message)
            }, 1000)
      })

      window.Echo.private(`messages.${this.user.id}`)
          .listen('SeenMessage', (e) => {
           this.$store.commit('updateMessage', e.message)
      })


      window.Echo.private(`messages.${this.user.id}`)
          .listen('SystemMessage', (e) => {
            setTimeout(() => {
               this.$store.commit('pushMessage', e.message)
              // this.$store.commit('transaction_status', e.message.transaction.status)
              //  console.log(e.message)
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
