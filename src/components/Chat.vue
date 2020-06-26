<template>
<div class="container">
  <div class="card">
      <div class="card-header">
         <h1>{{post.title}}</h1>
         <h3>{{post.user.username}}</h3>
         <h5>{{post.price}}</h5>
      </div>
      <div class="card-body d-flex flex-column justify-content-between">
          <div class="messages">
              <ul>
                  <li v-for="message in postMessages" :key="message.id" :class="`message${message.from == user.id ? ' sent' : ' received'}`">
                      <div class="text">
                          {{message.text}}
                      </div>
                  </li>
              </ul>
          </div>
          <div class="form-group">
              <textarea class="form-control" v-model="text" @keyup.enter="send"></textarea>
          </div>

      </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:mapGetters(['post', 'postMessages', 'user']),
    data(){
        return{
            text: ''
        }
    },
    methods:{
        send(e){
            e.preventDefault()
            if(this.text == ''){
                return;
            }
            this.$store.dispatch('sendMessage', {text: this.text})
            this.text = ''
        }
    },
    mounted(){
        this.$store.dispatch('getPostMessages')
    }

}
</script>

<style scoped>
.messages{
    height: 600px;
    max-height: 500px;
    overflow-y:scroll;
}
ul{
    list-style-type: none;
    padding: 3px;
}

li.message{
    margin: 10px 0;
    width: 100%;
}

.text{
    padding: 12px;
}

li.message.sent{
    text-align: right;
    background: lightskyblue;
}

li.message.received{
    text-align: left;
    background: lightgray;
}

textarea{
    resize: none;
}
</style>