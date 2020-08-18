<template>
    <div class="modal fade" :class="{'show ' : showModal}" :style="{display: display}" id="addCoins" tabindex="-1" aria-labelledby="addCoinsLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add Coins</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$emit('close')" >
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form @submit.prevent="addCoins" >
                <div class="modal-body">
                    <h3>Insuffucient Coins</h3>
                    <div class="form-group">
                        <select name="" id="" class="form-control" v-model="coins">
                            <option value=100>100</option>
                            <option value=300>300</option>
                            <option value=2000>2000</option>
                        </select>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal"  @click="$emit('close')" >Close</button>
                    <button type="submit" class="btn btn-primary" >Add Coins</button>
                </div>

            </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
    props: ['showModal', 'display'],
    computed: mapGetters(['user']),
    data(){
        return{
            coins: 100,
             boosts: [
                {
                    id: 1,
                    coins: '100',
                    days: '3',
                    type: '1'
                },
                 {
                     id:2,
                    coins: '300',
                    days: '7',
                    type: '2'
                },
                {
                     id:3,
                    coins: '2000',
                    days: '30',
                    type: '3'
                },
            ],
        }
    },
    methods:{
        addCoins(){
            axios.patch('api/user/'+this.user.id+'/wallet', {
                coins: this.coins
            }).then(response => alert(response.data.message))

            this.$emit('close')
        }
    }
}
</script>

<style scoped>
.active{
    display: block
}
</style>