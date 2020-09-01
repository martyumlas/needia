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
                <li class="list-group-item d-flex justify-content-between" v-for="item in packages" :key="item.id" @click="handleBoosting(item)" style="cursor: pointer"
                :class="{'bg-dark text-light' : item.id == pack.id}">
                    <h4>{{item.name}} {{item.days}} days</h4>
                    <h4>{{item.coins}} coins</h4>
                </li>
            </ul>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="boostPost"  data-dismiss="modal">Boost Post</button>
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
    props:['packages'],
    components: {AddCoins},
    computed: mapGetters(['post']),
    data(){
        return {
            package:[],
            pack: {id : 1},
            showModal: false,
            display: 'none'
        }
    },
    methods:{
        handleBoosting(boost){
           this.pack.id = boost.id
        },
        boostPost(){
            axios.post('api/post/' + this.post.id + '/boost',{package_id: this.pack.id })
            .then(response => {
                if(response.data.message == "Insufficient Coins"){
                   this.showModal = true
                   this.display = 'block'
                } else {
                    alert(response.data.message)
                }
            }).catch(e => {alert(e.response.data.error), console.log(e.response.data.error)})
        },
        close(){
            this.showModal = false
            this.display = 'none'
        },

    }
}
</script>

<style>

</style>