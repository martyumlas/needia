<template>
<div class="container">
  <div class="row">
      <Categories/>

      <div class="col-lg-9">

        <div id="carouselExampleIndicators" class="carousel slide my-4" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner" role="listbox">
            <div class="carousel-item active">
              <img class="d-block img-fluid" src="http://placehold.it/900x350" alt="First slide">
            </div>
            <div class="carousel-item">
              <img class="d-block img-fluid" src="http://placehold.it/900x350" alt="Second slide">
            </div>
            <div class="carousel-item">
              <img class="d-block img-fluid" src="http://placehold.it/900x350" alt="Third slide">
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>

        <div class="row">

          <div class="col-lg-4 col-md-6 mb-4" v-for="post in posts" :key="post.id">
            <div class="card h-100">
               <div :id="'post-'+post.id" class="carousel slide my-4" data-ride="carousel">
                <ol class="carousel-indicators">
                  <li :data-target="'#post-'+post.id" v-for="(image, index) in post.images" :key="index" :data-slide-to="index" class="active"></li>
                </ol>
                <div class="carousel-inner" role="listbox">
                  <div class="carousel-item"  v-for="(image, index) in post.images" :key="image.id" :class="{active : index == 0}">
                    <img class="d-block img-fluid" :src="baseUrl + image.photo_url" alt="First slide" style="width:100%; height: 250px">
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
              <div class="card-footer" v-if="post.user">
               <router-link :to="{name: 'UserProfile', params: {id : post.user.id}}"> <small class="text-muted">{{post.user.username}}</small></router-link>
               <p>{{post.expiration_date}}</p>
              </div>
            </div>
          </div>

        </div>
        <!-- /.row -->

      </div>


  </div>
</div>

</template>

<script>
import Categories from '../../components/Categories'
import { mapGetters } from 'vuex'
export default {
    components:{Categories},
    computed:mapGetters(['posts','user', 'baseUrl']),
}
</script>

<style scoped>
i{
  cursor: pointer;
}
</style>