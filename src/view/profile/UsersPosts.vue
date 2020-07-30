<template>
  <div>
    <div class="row">
      <Loader v-if="loading"/>
      <div class="col-lg-4 col-md-6 mb-4" v-for="post in usersPost" :key="post.id" v-else>
        <div class="card h-100">
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
            <small>{{post.is_published == 1 ? 'Active' : 'Inactive'}}</small>
            <small class="float-right" v-if="post.is_expired == 1">{{'Expired'}}</small>
            <small class="float-right" v-if="post.is_expired  == 0">{{post.expiration_date}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '../../components/Loader'
export default {
    components:{Loader},
    computed:mapGetters(['usersPost', 'baseUrl', 'loading']),
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
    },
}
</script>

<style scoped>
i{
  cursor: pointer;
}
</style>