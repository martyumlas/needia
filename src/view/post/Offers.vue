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

          <div class="col-lg-4 col-md-6 mb-4" v-for="offer in offers" :key="offer.id">
            <div class="card h-100">
               <div :id="'offer-'+offer.id" class="carousel slide my-4" data-ride="carousel">
                <ol class="carousel-indicators">
                  <li :data-target="'#offer-'+offer.id" v-for="(image, index) in offer.images" :key="index" :data-slide-to="index" class="active"></li>
                </ol>
                <div class="carousel-inner" role="listbox">
                  <div class="carousel-item"  v-for="(image, index) in offer.images" :key="image.id" :class="{active : index == 0}">
                    <img class="d-block img-fluid" :src="baseUrl + image.photo_url" alt="First slide" style="width:100%; height: 250px">
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
                  <a href="#">{{offer.title}}</a>
                </h4>
                <h5>{{offer.price}}</h5>
                <p class="card-text">{{offer.description}}</p>
              </div>
              <div class="card-footer" v-if="offer.user">
                <small class="text-muted">{{offer.user.username}}</small>
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
import axios from 'axios'
import Categories from '../../components/Categories'
import { mapActions, mapGetters } from 'vuex'
export default {
    components:{Categories},
    data(){
      return {
        baseUrl : axios.defaults.baseURL
      }
    },
    computed:mapGetters(['offers']),
    methods:mapActions(['getOffers']),
    mounted(){
      this.getOffers();
    }
}
</script>

<style>

</style>