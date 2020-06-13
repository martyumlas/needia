<template>
  <div>
    <div class="card card-body text-center" v-for="type in types" :key="type.id">
        <h5 class="card-title" @click="createNeed(type.id)">{{type.title}}</h5>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: mapGetters(['types']),
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