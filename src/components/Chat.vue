<template>
<div class="container my-5">
    <div class="card chat-box">
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
                        <div class="text" v-if="message.text">
                           {{message.text}}
                        </div>

                        <div v-if="message.session" class="images">
                            <div v-for="image in message.session.images" :key="image.id">
                                 <img :src="baseUrl + image.photo_url" alt="" style="height:100px; width: 100px;" >
                            </div>
                        </div>

                    </li>
                </ul>
            </div>
             <div class="row container mb-3">
                <div v-for="(image, key) in images" :key="key" >
                    <button class="close" @click="removeFile( key )">
                        <span>&times;</span>
                    </button>
                    <img class="preview" :ref="'image'" style="height:100px; width: 100px" />
                </div>
            </div>
            <div class="form-group d-flex">
                <textarea class="form-control" v-model="text" @keyup.enter="send"></textarea>
                <button class="btn btn-primary material-icons" @click="send">send</button>
            </div>
            <div class="d-flex">
                <div>
                    <label for="images">
                        <i class="material-icons" >camera_alt</i>
                    </label>
                    <input type="file" multiple style="display:none" id="images"  @change="onFileChange" />
                </div>
                <div>
                    <label for="files">
                        <i class="material-icons" >attach_file</i>
                    </label>
                    <input type="file" multiple style="display:none" id="files"/>
                </div>
            </div>


        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:mapGetters(['post', 'postMessages', 'user', 'password', 'baseUrl','transaction_status']),
    data(){
        return{
            text: '',
            images:[],
        }
    },
    methods:{
        send(e){
            e.preventDefault()
            if(this.text == '' && this.images == ''){
                return;
            }
            this.$store.dispatch('sendMessage', {text: this.text, images: this.images})
            this.text = ''
            this.images = ''
        },
        proceedWithDeal()
        {
            if(this.transaction_status == 1){
                this.$store.dispatch('markPostAsSold')
            }else if(this.transaction_status == 2){
                return ;
            }

            this.$store.dispatch('proceedWithTheDeal')

        },
         onFileChange(e) {
            var selectedFiles = e.target.files;
            for (let i = 0; i < selectedFiles.length; i++) {
                // console.log(selectedFiles[i]);
                this.images.push(selectedFiles[i]);
            }

            for (let i = 0; i < this.images.length; i++) {
                let reader = new FileReader();
                reader.onload = () => {
                this.$refs.image[i].src = reader.result;

                // console.log(this.$refs.image[i].src);
                };

                reader.readAsDataURL(this.images[i]);
            }

        },
        removeFile( key ){
            if(this.isEditing){
               this.post.images.splice(key, 1)
            }else{
                this.images.splice( key, 1 );
            }
        },

    },
    mounted(){
        this.$store.dispatch('getPostMessages')


    }

}
</script>

<style scoped>
.chat-box{
    border: 1px solid black;
}
i{
    font-size: 2rem;
}

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

.sent .images{
    display: flex;
    flex-direction: row-reverse;

}
.received .images{
    display: flex;

}

li.message.received{
    text-align: left;
    background: lightgray;
}

textarea{
    resize: none;
}
</style>