<template>
<div class="container">
  <div class="card">
      <div class="card-header">
         <h1>{{post.title}}</h1>
         <h3>{{post.user.username}}</h3>
         <h5>{{post.price}}</h5>
         <button class="btn btn-primary" @click="proceedWithDeal" v-if="post.user.id == user.id" :class="{'disabled' : transaction_status === 2}">{{transaction_status == 1 ? "Mark As Sold" : transaction_status == 2 ? 'Sold' : 'Proceed with deal'}}</button>
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
import Echo from 'laravel-echo';
export default {
    computed:mapGetters(['post', 'postMessages', 'user', 'password', 'baseUrl','transaction_status']),
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
        },
        proceedWithDeal()
        {
            if(this.transaction_status == 1){
                this.$store.dispatch('markPostAsSold')
            }else if(this.transaction_status == 2){
                return ;
            }

            this.$store.dispatch('proceedWithTheDeal')

        }

    },
    mounted(){
        this.$store.dispatch('getPostMessages')



        var basicAuth = 'Basic ' + btoa(this.user.email + ':' + this.password);

        window.Pusher = require('pusher-js');



        window.Echo = new Echo({
            broadcaster: 'pusher',
            key: '5f935cf5b004088ca696',
            cluster: 'ap1',
            encrypted: false,
            forceTLS: true,
            authEndpoint: this.baseUrl + 'broadcasting/auth',
            auth:{
               headers:{
                    Authorization : basicAuth,
               }
            }
        });


        window.Echo.private(`messages.${this.user.id}`)
            .listen('NewMessage', (e) => {
            this.$store.commit('pushMessage', e.message)
            console.log(e)
        })
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