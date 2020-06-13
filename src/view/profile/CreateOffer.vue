<template>
  <div>
    <div class="card card-body text-center" v-for="type in types" :key="type.id">
        <h5 class="card-title" @click="createOffer(type.id)">{{type.title}}</h5>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed: mapGetters(['types']),
    methods:{...mapActions(['getOfferTypes']),
        createOffer(id){
            this.$store.dispatch('getCategories', id)
            this.$store.commit('setTypeId', id)
            this.$router.push('/form')
        }
    },
    mounted(){
        this.getOfferTypes()
    }
}
</script>

<style>

</style>