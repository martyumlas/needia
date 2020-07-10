<template>
    <div class="col-lg-3" >

        <h1 class="my-4">Shop Name</h1>
        <div class="list-group" v-for="category in categories" :key="category.id">
          <a class="list-group-item" data-toggle="collapse" :href="'#subcategory' + category.id" role="button" aria-expanded="false" aria-controls="collapseExample">
            {{category.title}}
          </a>
          <ul :id="'subcategory'+category.id" class="collapse">
            <li v-for="subcategories in category.sub_categories" :key="subcategories.id">
              <a href="#" @click="search(subcategories, category)">{{subcategories.title}}</a>
              </li>
          </ul>
        </div>
      </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed:mapGetters(['categories']),
  methods:{
    search(subcategories, category){
      this.$store.commit('setSearchSubCategories', subcategories.title)
      this.$store.commit('setSearchSubCategoriesId', subcategories.id)
      this.$store.commit('setSearchCategory', category.title)
      this.$store.dispatch('getPosts')
    }
  },
  mounted(){
    this.$store.dispatch('getAllCategories');
  }

}
</script>

<style>

</style>