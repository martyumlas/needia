<template>
  <div>
      <div class="form-group">
        <label for="categories">Category</label>
        <select id="categories" class="form-control"  required v-model="selectedFilter" @change="filterPost">
            <option value="">All</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
        </select>
    </div>
    <div class="row">
      <div class="col-lg-4 col-md-6 mb-4" v-for="need in usersPost" :key="need.id">
        <div class="card h-100">
          <div class="card-header">
              <i class="material-icons" @click="handleEdit(need.id)">edit</i>
              <button class="close" @click="handleDelete(need.id)">&times;</button>
            </div>
            <div :id="'need-'+need.id" class="carousel slide my-4" data-ride="carousel">
            <ol class="carousel-indicators">
              <li :data-target="'#need-'+need.id" v-for="(image, index) in need.images" :key="index" :data-slide-to="index" class="active"></li>
            </ol>
            <div class="carousel-inner" role="listbox">
              <div class="carousel-item"  v-for="(image, index) in need.images" :key="image.id" :class="{active : index == 0}">
                <img class="d-block img-fluid" :src="baseUrl + image.photo_url" alt="First slide" style="width:100%;height: 250px">
              </div>
            </div>
            <a class="carousel-control-prev" :href="'#need-'+need.id" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next"  :href="'#need-'+need.id" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">{{need.title}}</a>
            </h4>
            <h5>{{need.min_price}} - {{need.max_price}}</h5>
            <p class="card-text">{{need.description}}</p>
          </div>
          <div class="card-footer">
            <small>{{need.is_published == 1 ? 'Active' : 'Inactive'}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
     data(){
      return {
        baseUrl : axios.defaults.baseURL,
        selectedFilter : ''
      }
    },
    methods:{
       handleDelete(id){
        let result = confirm('Are you  sure?')

        if(result){
          this.$store.dispatch('deletePost', id)
        }
      },
      handleEdit(id){
        this.$store.dispatch('getPost', id)
        this.$store.commit('isEditing', true)
        this.$router.push('/form')
      },
      filterPost(){
        this.$store.dispatch('getUsersPost', {id: 2, is_published: this.selectedFilter})
      }
    },
    computed:mapGetters(['usersPost']),
    mounted(){
      this.$store.dispatch('getUsersPost', {id: 2})
      this.$store.commit('setPostType', 2)
    }

}
</script>

<style>

</style>