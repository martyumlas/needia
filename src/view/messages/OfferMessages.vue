<template>
    <div class="container">

        <MessageList/>

    </div>
</template>

<script>
import MessageList from '../../components/MessageList'
export default {
    components:{MessageList},
    mounted(){
        this.$store.dispatch('getMessages', {post_type: 1})
    }
}
</script>

<style>

</style>