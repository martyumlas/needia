<template>
  <div>
    <Loader v-if="loading"/>
    <div class="card card-body text-center" v-for="type in types" :key="type.id">
        <h5 class="card-title" @click="createNeed(type.id)">{{type.title}}</h5>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Loader from '../../components/Loader'
import axios from 'axios'
export default {
  computed: mapGetters(['types', 'loading', 'user']),
  components:{Loader},
  methods:{...mapActions(['getNeedTypes']),
      createNeed(id){
          this.$store.dispatch('getCategories', id)
          this.$router.push('/form')

      }
  },
  mounted(){
      this.getNeedTypes()
      axios.get('api/user/'+ this.user.id + '/allowed-post-left',{params: {post_type: 2}} ).then(response => console.log(response.data))
  }
}
</script>

<style>

</style>