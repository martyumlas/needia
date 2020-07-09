<template>
<div class="container my-5">
        <Message/>
        <Errors/>
    <div class="card chat-box">
        <div class="card-header">
            <h1>{{post.title}}</h1>
            <h3>{{post.user.username}}</h3>
            <h5>{{post.price}}</h5>
            <button class="btn btn-primary" @click="proceedWithDeal" v-if="post.user.id == user.id" :class="{'disabled' : transaction_status === 2}">{{transaction_status == 1 ? "Mark As Sold" : transaction_status == 2 ? 'Sold' : 'Proceed with deal'}}</button>
            <button class="btn btn-primary ml-3" v-if="transaction_status == 1 && post.user_id === user.id" @click="cancelDeal">Cancel Deal</button>
            <router-link class="btn btn-primary ml-3" v-if="transaction_status === 2" to="/review" >Leave a review</router-link>
        </div>
        <div class="card-body d-flex flex-column justify-content-between">
            <div class="messages">
                <ul>
                    <li v-for="message in postMessages" :key="message.id" :class="`message${message.from == user.id ? ' sent' : ' received'}`">
                        <div class="text" v-if="message.text">
                           {{message.text}}
                        </div>

                        <div v-if="message.session" class="images">
                            <div v-for="image in message.session.images" :key="image.id" >
                                 <img :src="baseUrl + image.photo_url" alt="" style="height:100px; width: 100px;" >
                            </div>
                        </div>
                        <div  v-if="message.session">
                            <div v-for="file in message.session.files" :key="file.id">
                                <div><a :href="baseUrl + file.file_url">{{file.file_alt}}</a></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
             <div class="row container mb-3">
                <div v-for="(image, key) in images" :key="key" >
                    <button class="close" @click="removeImage( key )">
                        <span>&times;</span>
                    </button>
                    <img class="preview" :ref="'image'" style="height:100px; width: 100px" />
                </div>
            </div>
            <div class="form-group d-flex">
                <textarea class="form-control" v-model="text" @keyup.enter="send"></textarea>
                <button class="btn btn-primary material-icons" @click="send">send</button>
            </div>
            <div class="large-12 medium-12 small-12 cell">
                <div v-for="(file, key) in files" class="file-listing" :key="key" >{{ file.name }} <span class="remove-file" v-on:click="removeFile( key )">Remove</span></div>
            </div>
            <div class="d-flex">
                <div>
                    <label for="images">
                        <i class="material-icons" >camera_alt</i>
                    </label>
                    <input type="file" multiple style="display:none" id="images"  @change="onImageChange" />
                </div>
                <div>
                    <label for="files">
                        <i class="material-icons" >attach_file</i>
                    </label>
                    <input type="file" multiple style="display:none"   :ref="'files'" id="files" @change='onFileChange'/>
                </div>
            </div>


        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Errors from './Errors'
import Message from './Message'
export default {
    components: {Errors, Message},
    computed:mapGetters(['post', 'postMessages', 'user', 'password', 'baseUrl','transaction_status', 'message', 'errors']),
    data(){
        return{
            text: '',
            images:[],
            files:[],
        }
    },
    methods:{
        send(e){
            e.preventDefault()
            if(this.text == '' && this.images == '' && this.files == ''){
                return;
            }
            this.$store.dispatch('sendMessage', {text: this.text, images: this.images, files: this.files})
            this.text = ''
            this.images = ''
            this.files = ''
        },
        proceedWithDeal()
        {
            if(this.transaction_status == 1){
               return this.$store.dispatch('markPostAsSold')
            }else if(this.transaction_status == 2){
              return  this.$store.dispatch('markPostAsSold');
            }
            this.$store.dispatch('proceedWithTheDeal')
        },
        cancelDeal()
        {
            this.$store.dispatch('cancelDeal')
        },
        onImageChange(e) {
            var selectedFiles = e.target.files;
            for (let i = 0; i < selectedFiles.length; i++) {
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
        removeImage( key ){
            if(this.isEditing){
               this.post.images.splice(key, 1)
            }else{
                this.images.splice( key, 1 );
            }
        },
        removeFile( key ){
            this.files.splice( key, 1 );
        },

        onFileChange()
        {
            let uploadedFiles = this.$refs.files.files;
            for( var i = 0; i < uploadedFiles.length; i++ ){
                this.files.push( uploadedFiles[i] );
            }
        }

    },
    mounted(){
        this.$store.dispatch('getPostMessages')

        var container = this.$el.querySelector(".messages");
        container.scrollTop = container.scrollHeight;

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