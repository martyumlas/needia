<template>
  <div>
        <div>
            {{user.rating}}
        </div>
        <hr>
        <div v-if="!is_dispute">
            <ul class="list-group">
                <li class="list-group-item" v-for="review in reviews" :key="review.id">
                    <div class="d-flex align-items-center">
                         <img :src="review.review_from.photo_url ? baseUrl + review.review_from.photo_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT7umTPgrLSV5xtD74U98xBYm2wQEi7RLNyotXacUjd1c3fhJyS&usqp=CAU'" alt="" width="100" height="100" class="rounded-circle mr-3">
                        <div>
                            <p><strong>{{review.review_from.username}}</strong><button class="btn btn-primary btn-sm ml-3" @click="dispute(review)">Dispute</button></p>
                            <p>{{review.text}}</p>
                            <p>{{review.user_rating}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div v-else>
            <form @submit.prevent="submitDispute">
                <div class="form-check" v-for="dispute in dispute_reviews" :key="dispute.index">
                    <input class="form-check-input" type="radio" name="exampleRadios" :id="'dispute'+dispute.value" :value="dispute.value" checked v-model="reason" @change="handleReason">
                    <label class="form-check-label" :for="'dispute'+dispute.value">
                    {{dispute.text}}
                    </label>
                </div>
                <div v-if="reason">
                    <div class="form-group mt-4">
                    <h3>Supporting Photos</h3>
                    <input type="file" multiple @change="onFileChange" />
                    </div>
                    <div>
                        <div class="row">
                            <div v-for="(image, key) in images" :key="key" >
                                <button class="close" @click="removeFile( key )">
                                    <span>&times;</span>
                                </button>
                                <img class="preview" :ref="'image'" style="height:100px; width: 100px" />
                            </div>
                        </div>
                    </div>
                    <div class="form-group mt-4">
                        <textarea class="form-control" v-model="description" placeholder="description" style="resize:none"></textarea>
                    </div>
                    <button class="btn btn-primary">Submit</button>
                </div>
            </form>

        </div>


  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            reviews: [],
            reason: '',
            images: [],
            description: '',
            is_dispute: false,
            review : '',
            dispute_reviews: [
                {
                    text : 'reason 1 (review is misleading)',
                    value : 1,
                },
                 {
                    text : 'reason 2 (review is not true)',
                    value : 2,
                },
                 {
                    text : 'reason 3 (issue was resolved)',
                    value : 3,
                },
                 {
                    text : 'reason 4 (inappropiate or abusive language)',
                    value : 4,
                },
            ]
        }
    },
    computed:mapGetters(['user', 'baseUrl']),
    methods:{
        dispute(review){
           this.is_dispute = true
           this.review = review
        },
        handleReason(){
            console.log(this.reason)
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
        submitDispute(){
            let form = new FormData

            for( var i = 0; i < this.images.length; i++ ){
                let file = this.images[i];

                form.append('images[' + i + ']', file);
            }

            form.append('review_from', this.review.user_from)
            form.append('review_id', this.review.id)
            form.append('reason', this.reason)
            form.append('description', this.description)


           axios.post('api/user/' + this.user.id + '/review-dispute', form)
           .then(response => {
               alert(response.data.message)
               this.$router.push('/profile')

            })

        }
    },
    mounted(){
        axios.get('api/user/'+this.user.id+'/reviews')
        .then(res => this.reviews = res.data)
    }

}
</script>

<style>

</style>