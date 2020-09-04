<template>
  <div>
    <Loader v-if="loading"/>
    <div class="card card-body text-center" v-for="type in types" :key="type.id" v-else>
        <h5 class="card-title" @click="createOffer(type)" :class="{'text-muted' : type.needr_plus && !user.is_subscribed}">{{type.title}}</h5>
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
        createOffer(type){
            if(this.user.is_subscribed && type.needr_plus || !this.user.is_subscribed && !type.needr_plus) {
                this.$store.dispatch('getCategories', type.id)
                this.$store.commit('setTypeId', type.id)
                this.$router.push('/form')
            }
        }
    },
    mounted(){
        this.$store.dispatch('getUser')
        this.getOfferTypes()
        axios.get('api/user/'+ this.user.id + '/allowed-post-left',{params: {post_type: 1}} ).then(response => console.log(response.data))
    }
}
</script>

<style>
</style>