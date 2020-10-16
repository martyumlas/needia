<template>
  <div class="container">
      <div class="form-group">
            <select class="form-control" v-model="filter" @change="getMessages">
                <option value="">All</option>
                <option value="1">My Needs</option>
                <option value="2">Other's Needs</option>
                <option value="3">On Going Needs</option>
                <option value="4">Completed Needs</option>
            </select>
        </div>
    <MessageList :id='2'/>

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
            this.$store.dispatch('getMessages', {post_type: 2, page: '', filter: this.filter})
        }
    },
    mounted(){
        this.$store.dispatch('getMessages', {post_type: 2,  page: ''})
    }
}
</script>

<style>

</style>