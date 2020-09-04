<template>
<div class="modal fade" id="highlightsModal" tabindex="-1" aria-labelledby="highlightsModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="highlightsModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
           <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between" v-for="item in highlights" :key="item.id"  @click="handleHighlight(item)"  style="cursor: pointer"
                :class="{'bg-dark text-light' : item.id == pack.id}">
                    <h4>{{item.name}} {{item.days}} days</h4>
                    <h4>{{item.coins}} coins</h4>
                </li>
            </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="highlightPost" data-dismiss="modal">Highlight Post</button>
      </div>
    </div>
  </div>
   <AddCoins :showModal='showModal' :display='display' @close='close' />
</div>
</template>

<script>
import axios from 'axios'
import AddCoins from './AddCoins'
import {mapGetters} from 'vuex'
export default {
     computed: mapGetters(['post']),
    props: ['highlights'],
       components: {AddCoins},
    data(){
        return {
            pack: {id : 1},
            showModal: false,
            display: 'none'
        }
    },
    methods:{
        handleHighlight(highlight){
           this.pack.id = highlight.id
        },
        highlightPost(){
             axios.post('api/post/' + this.post.id + '/highlight',{highlight_package_id: this.pack.id })
            .then(response => {
                    alert(response.data.message)
            }).catch(e => {
               if(e.response.data.errors == "Insufficient Coins"){
                   this.showModal = true
                   this.display = 'block'
                }
                alert(e.response.data.errors),
               console.log(e.response.data.errors)
            })
        },
        close(){
            this.showModal = false
            this.display = 'none'
        },
    },
    mounted(){

    }
}
</script>

<style>

</style>