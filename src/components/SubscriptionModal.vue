<template>
  <!-- Modal -->
<div class="modal fade" id="subscription" tabindex="-1" role="dialog" aria-labelledby="subscriptionLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="subscriptionLabel">Subscription</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body mx-auto">
          <button class="btn btn-primary" data-dismiss='modal' @click="subscribe">Try for Free (1 week)</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
    computed: mapGetters(['user']),
    methods:{
        subscribe(){
            axios.post('api/user/' + this.user.id + '/subscribe')
            .then(response => {
              alert(response.data.message)
              this.$store.dispatch('getUser')
              this.$store.dispatch('getOfferTypes')
              this.$store.dispatch('getNeedTypes')
            })
            .catch(e => console.log(e))
        }
    }
}
</script>

<style>

</style>