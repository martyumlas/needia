<template>
   <div class="alert alert-danger" v-if="errors" >
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="clearErrors">
            <span aria-hidden="true">&times;</span>
          </button>
        <ul v-for="items in errors" :key="items.id">
          <li v-for="error in items" :key="error.id">{{error}}</li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed:mapGetters(['errors']),
  methods:{
    clearErrors(){
      this.$store.commit('setErrors', '')
    }
  }
}
</script>

<style>

</style>