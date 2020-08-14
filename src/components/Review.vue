<template>
  <div class="container mt-5">
        <div class="card card-body">
            <form  @submit.prevent="sendReview">
                    <div class="form-group">
                        <label for="">Responsiveness</label>
                        <input type="number" class="form-control" step="0.50" v-model="responsiveness">
                    </div>
                    <div class="form-group">
                        <label for="">Payment and Delivery</label>
                        <input type="number" class="form-control" step="0.50" v-model="payment_delivery">
                    </div>
                    <div class="form-group">
                        <label for="">Politeness</label>
                        <input type="number" class="form-control" step="0.50" v-model="politeness">
                    </div>
                    <div class="form-group">
                        <label for="">Quality</label>
                        <input type="number" class="form-control" step="0.50" v-model="quality">
                    </div>
                    <div class="form-group">
                        <label for="">Leave a review</label>
                        <textarea class="form-control" v-model="text"></textarea>
                    </div>
                    <button class="btn btn-primary" type="submit">Save</button>
            </form>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    computed: mapGetters(['contact', 'user']),
    data(){
        return {
            responsiveness : '',
            payment_delivery: '',
            politeness : '',
            quality : '',
            text: '',
            post_id : '',
            transaction_id: ''
        }
    },
    methods:{
        sendReview()
        {
            axios.post('api/user/' + this.contact + '/review', {
                responsiveness : this.responsiveness,
                payment_delivery : this.payment_delivery,
                politeness : this.politeness,
                quality : this.quality,
                text: this.text,
                user_from: this.user.id,
                post_id: this.post_id,
                transaction_id: this.transaction_id
            }).then(res => console.log(res.data))

            this.$router.push('/')
        }
    },
    mounted(){
        this.post_id = this.$route.params.post_id
        this.transaction_id = this.$route.params.transaction_id
    }
}
</script>

<style>

</style>