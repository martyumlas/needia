<template>
  <!-- Page Content -->
  <div class="container">
    <Loader v-if="loading"/>
    <div class="row" v-else>

      <div class="col-lg-12 mx-auto">
        <div class="card mt-4">
          <span v-if="post.user.id !== user.id" class="d-flex mt-2 justify-content-between">
            <button class="btn btn-primary ml-2" @click="reportPost">Report Post</button>
            <!-- <span class="d-flex justify-content-end" v-if="!post.bookmarks.length">
              <i class="material-icons" @click="handleBookmark(post)">bookmark</i>
            </span>
            <span class="d-flex justify-content-end"  v-for="bookmark in post.bookmarks" :key="bookmark.id" v-else>
              <i class="material-icons" :class="{'text-danger' : bookmark.user_id === user.id ?  bookmark.is_bookmarked : ''}" @click="handleBookmark(post)">bookmark</i>
            </span> -->
            <span>
              <i class="material-icons" :class="{'text-danger' : is_bookmarked == 1 }" @click="handleBookmark">bookmark</i>
            </span>
          </span>

          <div id="carouselExampleIndicators" class="carousel slide my-4" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="'#carouselExampleIndicators" v-for="(image, index) in post.images" :key="index" :data-slide-to="index" class="active"></li>
            </ol>
            <div class="carousel-inner" role="listbox">
              <div class="carousel-item"  v-for="(image, index) in post.images" :key="image.id" :class="{active : index == 0}">
                <img class="d-block img-fluid" :src="baseUrl + image.photo_url" alt="First slide" style="width:100%; height:500px" >
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
          <div class="card-body">
            <h3 class="card-title">{{post.title}}</h3>
            <h4>{{post.price}}</h4>
            <p class="card-text">{{post.description}}</p>
            <span class="text-warning">&#9733; &#9733; &#9733; &#9733; &#9734;</span>
            4.0 stars
          </div>
          <button class="btn btn-primary" v-if="post.user.id !== user.id " @click="handleSendMessage"><h2>Send Message</h2></button>
           <!-- <ul>
             <li v-for="message in messages" :key="message.id">{{message.length}}</li>
           </ul> -->
           <button class="btn btn-primary"  v-if="post.user.id === user.id">
              <h2 @click='openThread' class="text-center" v-if="messages"> {{messages.length}} active chat</h2>
           </button>
        </div>
        <!-- /.card -->

        <div class="card card-outline-secondary my-4">
          <div class="card-header">
            Product Reviews
          </div>
          <div class="card-body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
            <small class="text-muted">Posted by Anonymous on 3/1/17</small>
            <hr>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
            <small class="text-muted">Posted by Anonymous on 3/1/17</small>
            <hr>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
            <small class="text-muted">Posted by Anonymous on 3/1/17</small>
            <hr>
            <a href="#" class="btn btn-success">Leave a Review</a>
          </div>
        </div>
        <!-- /.card -->

      </div>
      <!-- /.col-lg-9 -->

    </div>

  </div>
</template>

<script>
import Loader from '../../components/Loader'
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
    components:{Loader},
    computed:mapGetters(['post', 'baseUrl', 'user','messages','baseUrl', 'loading']),
    data(){
      return {
        is_bookmarked: ''
      }
    },
    methods:{
      handleBookmark(){
        this.user ?
        axios.post('api/post/'+this.post.id+'/user/'+this.user.id+'/bookmark', {
          bookmark : this.is_bookmarked == 0 ? 1 : 0
        }).then(res => this.is_bookmarked = res.data.bookmark)
        .catch(e => console.log(e))
        :
        this.$router.push('/login')
      },
      handleSendMessage(){
        this.$store.commit('reply', false)
        this.$store.commit('contact', '')
        this.$router.push('/chat')
      },
      openThread(){
         this.$router.push('/open-thread')
      },
      reportPost(){
        this.$router.push('/report-post/' + this.post.id)
      }
    },
    mounted(){
      this.$store.dispatch('getPost', this.$route.params.id)

      if(this.user) {
        axios.get('api/post/'+this.post.id+'/user/'+this.user.id+'/bookmark')
          .then(res => {this.is_bookmarked = res.data})
          .catch(e => console.log(e))
      }


    setTimeout(() => {
      this.$store.dispatch('postMessages')
    },5000)

    }
}
</script>

<style scoped>
i{
  cursor: pointer;
}
</style>