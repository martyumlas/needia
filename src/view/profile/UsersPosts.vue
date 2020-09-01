<template>
  <div>
    <div class="row">
      <Loader v-if="loading"/>
      <div class="col-lg-4 col-md-6 mb-4" v-for="post in usersPost" :key="post.id" v-else >
        <div class="card h-100" :class="{'highlight' : post.highlight}">
          <div class="card-header">
            <i class="material-icons" @click="handleEdit(post.id)">edit</i>
            <button class="close" @click="handleDelete(post.id)">&times;</button>
          </div>
            <div :id="'post-'+post.id" class="carousel slide my-4" data-ride="carousel">
            <ol class="carousel-indicators">
              <li :data-target="'#post-'+post.id" v-for="(image, index) in post.images" :key="index" :data-slide-to="index" class="active"></li>
            </ol>
            <div class="carousel-inner" role="listbox">
              <div class="carousel-item"  v-for="(image, index) in post.images" :key="image.id" :class="{active : index == 0}">
                <img class="d-block img-fluid" :src="baseUrl + image.photo_url" alt="First slide" style="width:100%;height: 250px">
              </div>
            </div>
            <a class="carousel-control-prev" :href="'#post-'+post.id" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next"  :href="'#post-'+post.id" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <div class="card-body">
            <h4 class="card-title">
             <router-link :to="{name: 'Post', params:{id: post.id}}">{{post.title ? post.title : post.brand}}</router-link>
            </h4>
            <h5>{{post.price}}</h5>
            <p class="card-text">{{post.description}}</p>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-between mb-3">
              <small>{{post.is_published == 1 ? 'Active' : 'Inactive'}}</small>
              <small class="float-right" v-if="post.is_expired == 1">{{'Expired'}}</small>
              <small class="float-right" v-if="post.is_expired  == 0">{{post.expiration_date}}</small>
            </div>
            <div class="d-flex justify-content-between">
               <div v-if="!post.is_expired">
                  <button class="btn btn-primary" @click="boostPost(post)" data-toggle="modal" data-target="#exampleModal" v-if="!post.boost">Boost</button>
                  <p class="btn btn-danger"  @click="boostPost(post)" data-toggle="modal" data-target="#exampleModal"  v-else>Boosted</p>
              </div>
              <div v-if="!post.is_expired">
                <button class="btn btn-success"  @click="highlightPost(post)" data-toggle="modal" data-target="#highlightsModal" v-if="!post.highlight">Highlight</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <Modal :packages='packages'/>
    <HighlightModal :highlights='highlights'/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '../../components/Loader'
import Modal from '../../components/BoostModal'
import HighlightModal from '../../components/HighlightModal'
import axios from 'axios'
export default {
    components:{Loader, Modal, HighlightModal},
    computed:mapGetters(['usersPost', 'baseUrl', 'loading']),
    data () {
      return {
        packages:[],
        highlights: []
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

      boostPost(post){
       this.$store.commit('setPost', post);
      },
      highlightPost(post){
         this.$store.commit('setPost', post);
      }
    },
    mounted(){
        axios.get('api/packages').then(response => this.packages = response.data)
        axios.get('api/highlight-packages').then(res => this.highlights = res.data)
    }
}
</script>

<style scoped>
i{
  cursor: pointer;
}
.highlight{
  border: 10px solid lightblue
}
</style>