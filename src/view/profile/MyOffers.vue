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
      <div class="col-lg-4 col-md-6 mb-4" v-for="offer in usersPost" :key="offer.id">
        <div class="card h-100">
          <div class="card-header">
            <i class="material-icons" @click="handleEdit(offer.id)">edit</i>
            <button class="close" @click="handleDelete(offer.id)">&times;</button>
          </div>
            <div :id="'offer-'+offer.id" class="carousel slide my-4" data-ride="carousel">
            <ol class="carousel-indicators">
              <li :data-target="'#offer-'+offer.id" v-for="(image, index) in offer.images" :key="index" :data-slide-to="index" class="active"></li>
            </ol>
            <div class="carousel-inner" role="listbox">
              <div class="carousel-item"  v-for="(image, index) in offer.images" :key="image.id" :class="{active : index == 0}">
                <img class="d-block img-fluid" :src="baseUrl + image.photo_url" alt="First slide" style="width:100%;height: 250px">
              </div>
            </div>
            <a class="carousel-control-prev" :href="'#offer-'+offer.id" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next"  :href="'#offer-'+offer.id" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <div class="card-body">
            <h4 class="card-title">
             <router-link :to="{name: 'Post', params:{id: offer.id}}">{{offer.title ? offer.title : offer.brand}}</router-link>
            </h4>
            <h5>{{offer.price}}</h5>
            <p class="card-text">{{offer.description}}</p>
          </div>
          <div class="card-footer">
            <small>{{offer.is_published == 1 ? 'Active' : 'Inactive'}}</small>
            <small class="float-right" v-if="offer.is_expired == 1">{{'Expired'}}</small>
            <small class="float-right" v-if="offer.is_expired  == 0">{{offer.expiration_date}}</small>
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
    computed:mapGetters(['usersPost',]),
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
        this.$store.dispatch('getUsersPost', {id: 1, is_published: this.selectedFilter})
      }
    },
    mounted(){
      this.$store.dispatch('getUsersPost', {id: 1})
       this.$store.commit('setPostType', 1)
    }
}
</script>

<style scoped>
i{
  cursor: pointer;
}
</style>