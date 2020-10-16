<template>
    <div class="container">
        <div class="form-group">
            <select class="form-control" v-model="filter" @change="getMessages">

                <option value="">All</option>
                <option value="1">My Offers</option>
                <option value="2">Other's Offers</option>
                <option value="3">On Going Offers</option>
                <option value="4">Completed Offers</option>
            </select>
        </div>
        <MessageList :id='1'/>

    </div>
</template>

<script>
import MessageList from '../../components/MessageList'
export default {
    components:{MessageList},
    data(){
        return {
            filter: ''
        }
    },
    methods: {
        getMessages(){
            this.$store.dispatch('getMessages', {post_type: 1, page: '', filter: this.filter})
        }
    },
    mounted(){
        this.$store.dispatch('getMessages', {post_type: 1, page: ''})
    }
}
</script>

<style>

</style>