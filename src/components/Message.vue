<template>
  <div class="alert alert-success">
      {{message.message}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:mapGetters(['message'])
}
</script>

<style>

</style>