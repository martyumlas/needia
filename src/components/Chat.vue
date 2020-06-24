<template>
<div class="container">
  <div class="card">
      <div class="card-header">
          <h5>{{postChat.title}}</h5>
          <h4>{{postChat.price}}</h4>

      </div>
      <div class="card-body d-flex flex-column justify-content-between" style="height:600px">
          <h6>{{postChat.user.username}}</h6>
          <div class="feed" ref="feed">
            <ul>
              <li v-for="message in postMessages" :key="message.id" :class="`message${message.from == user.id ? ' sent' : ' received'}`">
                  <div class="text">
                    {{message.text}}
                  </div>
              </li>
            </ul>
          </div>

          <div class="form-group">
              <textarea  class="form-control" placeholder="message" @keyup.enter="sendMessage" v-model="text"></textarea>
          </div>
      </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props:['post'],
    computed:mapGetters(['postMessages', 'postChat', 'user']),
    mounted(){
         this.$store.dispatch('getPostMessages', this.postChat.id)
         this.scrollToBottom()
    },
    data(){
        return {
            text:''
        }
    },
    methods:{
        sendMessage(e){
            e.preventDefault()
            if(this.text == ''){
                return;
            }

            this.$store.dispatch('sendMessage', this.text)
            this.text = ''
        },
        scrollToBottom(){
            setTimeout(() => {

                this.$refs.feed.scrollTop = this.$refs.feed.scrollHeight - this.$refs.feed.clientHeight

            }, 50);
        },

    }
}
</script>

<style scoped>
    textarea{
        resize: none;
    }
    .feed{
        height: 100%;
        max-height: 500px;
        overflow: scroll;
    }
    ul{
        list-style-type: none;
        padding: 3px;
    }



    li.message{
        margin: 10px 0;
        /* width: 100%; */

    }
    .text{
        padding: 20px;
        border-radius: 5px;
        display: inline-block;
        max-width: 200px;
    }
    li.received{
        background: lightgray;
        text-align: left;
    }
     li.sent{
        background: lightblue;
        text-align: right;
    }

</style>