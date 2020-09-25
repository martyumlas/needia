<template>
<div class="container">
    <div class="row">
        <div class="col-lg-3">
        </div>
        <div class="col-lg-9 mb-5 mt-4">
            <form @submit.prevent='handleSubmit'>
                <div class="form-check" v-for="issue in reasons" :key="issue.index">
                    <input class="form-check-input" type="radio" name="exampleRadios" :id="'issue'+issue.value" :value="issue.value" checked v-model="reason" @change="handleIssue">
                    <label class="form-check-label" :for="'issue'+issue.value">
                    {{issue.text}}
                    </label>
                </div>
                <div class="form-group mt-4" v-if="reason">
                    <textarea class="form-control" v-model="description" placeholder="description" style="resize:none"></textarea>
                </div>
                <button class="btn btn-primary">Submit</button>
            </form>
    </div>
    </div>

</div>

</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    computed: mapGetters(['user']),
    data(){
        return{
            description: '',
            post: '',
            reason: '',
            reasons : [
                 {
                    value: '1',
                    text: 'Suspicious Account',
                },
                 {
                    value: '2',
                    text: 'An Item Sold',
                },
                 {
                    value: '3',
                    text: 'An Item Bought',
                },
                 {
                    value: '4',
                    text: 'Cancelling on Deal',
                },
                 {
                    value: '5',
                    text: 'Duplicate posts',
                },
                 {
                    value: '6',
                    text: 'Selling Prohibited Item',
                },
                {
                    value: '7',
                    text: 'Offensive behavior/content',
                }
                ,
                {
                    value: '8',
                    text: 'Mispriced Listings',
                }
                ,
                {
                    value: '9',
                    text: 'Selling Counterfeit Items',
                }
                ,
                {
                    value: '10',
                    text: 'Irrelevant Keywords',
                }
                ,
                {
                    value: '11',
                    text: 'Items wrongly categorized',
                }
            ]
        }
    },
    methods:{
        handleIssue(){
            console.log(this.reason)
        },
        handleSubmit(){
            axios.post('api/user/'+ this.$route.params.id + '/report-profile', {
                reason: this.reason,
                description: this.description,
                reported_by: this.user.id
            })
            .then(response => {
                alert(response.data.message)
                this.$router.push('/')
            }).catch(e => {
                alert(e.response.data.errors)
            })


        }
    },
    mounted(){
        console.log(this.$route.params.id)
    }
}
</script>

<style>

</style>