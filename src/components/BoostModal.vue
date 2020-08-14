<template>
<div>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Boosting Option</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between" v-for="item in boosts" :key="item.id" @click="handleBoosting(item)" style="cursor: pointer"
                :class="{'bg-dark text-light' : item.id == boost.id,}">
                    <h4>{{item.days}} days</h4>
                    <h4>{{item.coins}} coins</h4>
                </li>
            </ul>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="boostPost">Boost Post</button>
        </div>
        </div>
    </div>
</div>

    <AddCoins :showModal='showModal' :display='display' @close='close' />
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddCoins from './AddCoins'
import axios from 'axios'
export default {
    components: {AddCoins},
    computed: mapGetters(['post']),
    data(){
        return {
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
            boost: {
                    id: 1,
                    coins: '100',
                    days: '3',
                    type: '1'
            },
            showModal: false,
            display: 'none'
        }
    },
    methods:{
        handleBoosting(boost){
           this.boost = boost
        },
        boostPost(){
            axios.post('api/post/' + this.post.id + '/boost',{type : this.boost.type })
            .then(response => {
                console.log(response.data)
                if(response.data.message == "Insufficient Coins"){
                   this.showModal = true
                   this.display = 'block'
                }
            })
        },
        close(){
            this.showModal = false
            this.display = 'none'
        }
    }
}
</script>

<style>

</style>