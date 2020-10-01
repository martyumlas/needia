<template>
    <div class="container">

        <MessageList :id='1'/>

    </div>
</template>

<script>
import MessageList from '../../components/MessageList'
export default {
    components:{MessageList},
    mounted(){
        this.$store.dispatch('getMessages', {post_type: 1, page: ''})
    }
}
</script>

<style>

</style>