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
export default {
  computed: mapGetters(['types', 'loading']),
  components:{Loader},
  methods:{...mapActions(['getNeedTypes']),
      createNeed(id){
          this.$store.dispatch('getCategories', id)
          this.$router.push('/form')
      }
  },
  mounted(){
      this.getNeedTypes()
  }
}
</script>

<style>

</style>