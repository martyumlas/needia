<template>
  <div>
    <Loader v-if="loading"/>
    <div class="card card-body text-center" v-for="type in types" :key="type.id" v-else>
        <h5 class="card-title" @click="createOffer(type.id)">{{type.title}}</h5>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from '../../components/Loader'
import axios from 'axios'
export default {
    computed: mapGetters(['types', 'loading', 'user']),
    components:{Loader},
    methods:{...mapActions(['getOfferTypes']),
        createOffer(id){
            this.$store.dispatch('getCategories', id)
            this.$store.commit('setTypeId', id)
            this.$router.push('/form')
        }
    },
    mounted(){
        this.getOfferTypes()
        axios.get('api/user/'+ this.user.id + '/allowed-post-left',{params: {post_type: 1}} ).then(response => console.log(response.data))
    }
}
</script>

<style>

</style>