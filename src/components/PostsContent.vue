<template>
   <div>
        <div class="d-flex flex-column" v-if="type == 1">
            <h3>{{title}}</h3>
            <div class="row">
                <div class="col-lg-4 col-md-6 mb-4"  v-for="post in posts"  :key="post.id" >
                    <div class="card h-100" :class="{'highlight' : post.highlight}">
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
                                <a  @click="clickInsight(post.id)" href="#" >{{post.title ? post.title : post.brand}}</a>
                            </h4>
                            <h5>{{parseFloat(post.price)}}</h5>
                            <p class="card-text">{{post.description}}</p>
                        </div>
                        <div class="card-footer" v-if="post.user">
                            <router-link :to="{name: 'UserProfile', params: {id : post.user.id}}"> <small class="text-muted">{{post.user.username}}</small></router-link>
                            <p>{{post.city}}</p>
                            <p>{{post.latitude}} - {{post.longitude}}</p>
                            <p class="btn btn-danger" v-if="post.boost">boosted <br>{{post.boost.expiration_date}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <div class="d-flex flex-column" v-else-if="type == 2">
            <h3>{{title}}</h3>
            <div class="row">
                <div class="col-lg-4 col-md-6 mb-4"  v-for="post in posts.data"  :key="post.id" >
                    <div class="card h-100" :class="{'highlight' : post.highlight}">
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
                                <a  @click="clickInsight(post.id)" href="#" >{{post.title ? post.title : post.brand}}</a>
                            </h4>
                            <h5>{{parseFloat(post.price)}}</h5>
                            <p class="card-text">{{post.description}}</p>
                        </div>
                        <div class="card-footer" v-if="post.user">
                            <router-link :to="{name: 'UserProfile', params: {id : post.user.id}}"> <small class="text-muted">{{post.user.username}}</small></router-link>
                            <p>{{post.city}}</p>
                            <p>{{post.latitude}} - {{post.longitude}}</p>
                            <p class="btn btn-danger" v-if="post.boost">boosted <br>{{post.boost.expiration_date}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination :data="posts" @pagination-change-page="topPicks" v-if="posts.length"/>
        </div>
        <div class="d-flex flex-column" v-else-if="type == 3">
            <h3>{{title}}</h3>
            <div class="row">
                <div class="col-lg-4 col-md-6 mb-4"  v-for="post in posts.data"  :key="post.id" >
                    <div class="card h-100" :class="{'highlight' : post.highlight}">
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
                                <a  @click="clickInsight(post.id)" href="#" >{{post.title ? post.title : post.brand}}</a>
                            </h4>
                            <h5>{{parseFloat(post.price)}}</h5>
                            <p class="card-text">{{post.description}}</p>
                        </div>
                        <div class="card-footer" v-if="post.user">
                            <router-link :to="{name: 'UserProfile', params: {id : post.user.id}}"> <small class="text-muted">{{post.user.username}}</small></router-link>
                            <p>{{post.city}}</p>
                            <p>{{post.latitude}} - {{post.longitude}}</p>
                            <p class="btn btn-danger" v-if="post.boost">boosted <br>{{post.boost.expiration_date}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination :data="posts" @pagination-change-page="changePage"/>
        </div>
         <div class="d-flex flex-column" v-else>
                <div v-for="items in posts.data" :key="items.id">
                  <h3>{{items[0].category.title}}</h3>
                  <div class="row">
                    <div class="col-lg-4 col-md-6 mb-4"  v-for="post in items" :key="post.id">

                       <div class="card h-100" :class="{'highlight' : post.highlight}">
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
                             <a  @click="clickInsight(post.id)" href="#" >{{post.title ? post.title : post.brand}}</a>
                            </h4>
                            <h5>{{post.price}}</h5>
                            <p class="card-text">{{post.description}}</p>
                          </div>
                          <div class="card-footer" v-if="post.user">
                          <router-link :to="{name: 'UserProfile', params: {id : post.user.id}}"> <small class="text-muted">{{post.user.username}}</small></router-link>
                          <!-- <p>{{post.expiration_date}}</p> -->
                          <p>{{post.category.title}}</p>
                          <p>{{post.sub_category.title}}</p>
                          <p>{{post.city}}</p>
                           <p class="btn btn-danger" v-if="post.boost">boosted <br>{{post.boost.expiration_date}}</p>
                          </div>
                        </div>
                    </div>
                  </div>
                  <Pagination :data="posts" @pagination-change-page="categoryPick"/>
                </div>

            </div>
   </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from 'laravel-vue-pagination'
export default {
    components:{Pagination},
    computed:mapGetters(['baseUrl','user']),
    props:['posts', 'title', 'type', 'related', 'searchCategory', 'searchString'],
    methods:{
        categoryPick(page ){
            this.$emit('categoryPick', page )
        },
        topPicks(page ){
            this.$emit('topPicks', page )
        },
        changePage(page ){
            this.$emit('changePage', page )
        },
        clickInsight(id){
            this.$emit('clickInsight', id)
        }
    }

}
</script>

<style scoped>
i{
  cursor: pointer;
}
.searches{
  font-size: 3rem;
}
.highlight{
  border: 10px solid blue
}
</style>