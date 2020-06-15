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

           <div class="col-lg-4 col-md-6 mb-4" v-for="need in needs" :key="need.id">
            <div class="card h-100">
               <div :id="'need-'+need.id" class="carousel slide my-4" data-ride="carousel">
                <ol class="carousel-indicators">
                  <li :data-target="'#need-'+need.id" v-for="(image, index) in need.images" :key="index" :data-slide-to="index" class="active"></li>
                </ol>
                <div class="carousel-inner" role="listbox">
                  <div class="carousel-item"  v-for="(image, index) in need.images" :key="image.id" :class="{active : index == 0}">
                    <img class="d-block img-fluid" :src="baseUrl + image.photo_url" alt="First slide" style="width:100%">
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
                <h5>{{need.price}}</h5>
                <p class="card-text">{{need.description}}</p>
              </div>
              <div class="card-footer" v-if="need.user">
                  <small class="text-muted">{{need.user.username}}</small>
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
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
export default {
    components:{Categories},
     data(){
      return {
        baseUrl : axios.defaults.baseURL
      }
    },
    computed:mapGetters(['needs']),
    methods:mapActions(['getNeeds']),
    mounted(){
      this.getNeeds();
    }
}
</script>

<style>

</style>