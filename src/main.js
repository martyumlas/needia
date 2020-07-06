import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import axios from 'axios'
import router from './router/index'
import './firebase'


Vue.config.productionTip = false
axios.defaults.baseURL = 'https://needia.demo.thinkbitsolutions.com/'
// axios.defaults.baseURL = 'http://localhost:6600/'
var email = store.getters.user.email;
var password = store.getters.password;
var basicAuth = 'Basic ' + btoa(email + ':' + password);
axios.defaults.headers.common['Authorization'] = basicAuth

new Vue({
  store,
  router,
  render: h => h(App),
  mounted(){
    this.$store.commit('setBaseUrl', axios.defaults.baseURL)
    this.$store.commit('setBasicAuth', basicAuth)
  },

}).$mount('#app')
