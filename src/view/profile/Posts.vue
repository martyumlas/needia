  <template>
<div >
    <div class="row">
      <div class="col-lg-4 col-md-6 mb-4" v-for="post in posts.data" :key="post.id">
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
            <small class="text-muted">{{post.user.username}}</small>
          </div>
        </div>
      </div>

    </div>
<Pagination :data='posts' @pagination-change-page="getSavedPosts"/>
</div>

</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Pagination from 'laravel-vue-pagination'
export default {
  components:{Pagination},
  props:['id'],
    data(){
      return {
        baseUrl : axios.defaults.baseURL,
        bookmark: ''
      }
    },
    computed:{...mapGetters(['posts','user']),
      bookmarks(){
        return this.posts.bookmarks.filter(book => console.log(book))
      }
    },
    methods:{
      getSavedPosts(page = 1) {
        this.$store.dispatch('getBookmarkedPosts', {id: this.id, page: page})
      },
      handleBookmark(post){
        console.log(post)
        post.bookmarks.filter(bookmark => {
          this.$store.dispatch('bookmark', {
            id: post.id,
            bookmark: !bookmark.is_bookmarked
          })
        })

        if(!post.bookmarks.length){
          this.$store.dispatch('bookmark', {
            id: post.id,
            bookmark: 1
          })
        }



      }
    },

}
</script>

<style scoped>
i{
  cursor: pointer;
}
</style>