<template>
  <div >
     <form @submit.prevent="handlePost">
          <div class="form-check" v-if="isEditing">
            <input type="checkbox" class="form-check-input" id="movers" true-value="1"  false-value="0" v-model="post.is_published">
            <label class="form-check-label" for="movers">Publish</label>
        </div>
         <div class="form-group">
               <input type="file" multiple @change="onFileChange" />
         </div>
         <div>
             <div class="row" v-if="!isEditing">
                <div v-for="(image, key) in images" :key="key" >
                    <button class="close" @click="removeFile( key )">
                        <span>&times;</span>
                    </button>
                    <img class="preview" :ref="'image'" style="height:100px; width: 100px" />
                </div>
            </div>
            <div  class="row" v-if="isEditing" >
                <div v-for="(image, key) in post.images" :key="key">
                    <button class="close" @click="removeFile( key )">
                        <span>&times;</span>
                    </button>
                    <img class="preview" :src="baseUrl + image.photo_url" style="height:100px; width: 100px" />
                </div>
            </div>
         </div>

         <div class="form-row">
            <div class="form-group col-md-6">
                <label for="categories">Category</label>
                <select id="categories" class="form-control" @change="setSubcategories" v-model="post.category_id" required>
                    <option selected v-for="category in categories" :key="category.id" :value="!isEditing ? category.id : post.category_id">{{!isEditing && category ? category.title : post.category.title}}</option>
                </select>
            </div>
            <div class="form-group col-md-6">
                <label for="sub_categories">Subcategory</label>
                <select id="sub_categories" class="form-control" v-model="post.sub_category_id" >
                    <option selected v-for="sub_categories in sub_categories" :key="sub_categories.id"  :value="sub_categories.id">{{sub_categories.title}}</option>
                </select>
            </div>
        </div>
        <div class="form-group" v-if="typeId !== 4">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" placeholder="Title" autocomplete="off" v-model="post.title">
        </div>
        <div v-if="typeId === 4">
            <div class="form-group">
                <label for="brand">Brand</label>
                <input type="text" class="form-control" id="brand" placeholder="Brand" autocomplete="off" v-model="post.brand">
            </div>
            <div class="form-group">
                <label for="make_and_model">Make And Model</label>
                <input type="text" class="form-control" id="make_and_model" placeholder="Make And Model" autocomplete="off" v-model="post.make">
            </div>
            <div class="form-group">
                <label for="year">Year</label>
                <input type="text" class="form-control" id="year" placeholder="Year" autocomplete="off" v-model="post.model_year">
            </div>
            <div class="form-group">
                <label for="transmission">Transmission</label>
                <select id="transmission" class="form-control" v-model="post.transmission">
                    <option value="" selected>Select One</option>
                    <option v-for="item in transmission" :key="item.index">{{item}}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="fuel">Fuel</label>
                  <select id="fuel" class="form-control" v-model="post.fuel">
                    <option value="" selected>Select One</option>
                    <option v-for="item in fuel" :key="item.index">{{item}}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="mileage">Mileage</label>
                <input type="text" class="form-control" id="mileage" placeholder="Mileage" autocomplete="off" v-model="post.mileage">
            </div>
        </div>
        <div class="form-group" v-if="postType === 1">
            <label for="price">Price</label>
            <input type="text" class="form-control" id="price" placeholder="Price" autocomplete="off" v-model="post.price">
        </div>
        <div class="form-row" v-if="postType== 2">
            <div class="form-group col-md-6">
                <label for="price">Min Price</label>
                <input type="text" class="form-control" id="price" placeholder="Price" autocomplete="off" v-model="post.min_price">
            </div>
            <div class="form-group col-md-6">
                <label for="price">Max Price</label>
                <input type="text" class="form-control" id="price" placeholder="Price" autocomplete="off" v-model="post.max_price">
            </div>
        </div>
        <div v-if="typeId === 5">
              <div class="form-group">
                <label for="type_of_vehicle">Type of Vehicle</label>
                <textarea class="form-control" v-model="post.type_of_vehicle"></textarea>
            </div>
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="driver" v-model="post.driver"  true-value="1"  false-value="0">
                <label class="form-check-label" for="driver">Driver</label>
            </div>
             <div class="form-check">
                <input type="checkbox" class="form-check-input" id="movers" true-value="1"  false-value="0" v-model="post.movers">
                <label class="form-check-label" for="movers">Movers</label>
            </div>
            <div class="form-group">
                <label for="no_of_movers">No of Movers</label>
                <input type="text" class="form-control" id="no_of_movers" placeholder="No of Movers" autocomplete="off" v-model="post.no_of_movers">
            </div>
        </div>
        <div v-if="typeId === 3">
            <div class="form-group">
                <label for="property_type">Property Type</label>
                  <select id="property_type" class="form-control" v-model="post.property_type">
                    <option v-for="item in property_type" :key="item.index">{{item}}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="bedroom">Bedroom</label>
                <select id="bedroom" class="form-control" v-model="post.no_of_bedroom">
                    <option value="" selected>Select One</option>
                    <option v-for="item in bed_and_bath" :key="item.index">{{item}}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="bathroom">Bathroom</label>
                <select id="bathroom" class="form-control" v-model="post.no_of_bathroom">
                    <option value="" selected>Select One</option>
                    <option v-for="item in bed_and_bath" :key="item.index">{{item}}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="floor_area">Floor Area</label>
                <input type="text" class="form-control" id="floor_area" placeholder="Floor Area" autocomplete="off" v-model="post.floor_area">
            </div>
            <div class="form-group">
                <label for="lot_area">Lot Area</label>
                <input type="text" class="form-control" id="lot_area" placeholder="Lot Area" autocomplete="off" v-model="post.lot_area">
            </div>
        </div>

        <div class="form-group" v-if="typeId !== 3 && typeId !== 5">
            <label for="categories">Condition</label>
            <select id="categories" class="form-control" v-model="post.condition">
                <option>New</option>
                <option>Pre-loved</option>
            </select>
        </div>
        <div class="form-group">
            <label for="meetup">Meetup/Delivery</label>
            <select id="meetup" class="form-control" v-model="post.mode_of_shipping">
                <option>Meetup</option>
                <option>Delivery</option>
            </select>
        </div>
        <div class="form-group">
            <label for="mode_of_payment">Mode Of Payment</label>
            <select id="mode_of_payment" class="form-control" v-model="post.mode_of_payment">
                <option value="1">Barter</option>
                <option value="2">Bank Transfer</option>
                <option value="3">Credit Card</option>
                <option value="4">COD</option>
                <option value="5">Others</option>
            </select>
        </div>
         <div class="form-group">
            <label for="location">Location</label>
            <div id="pac-container">
                <input id="pac-input" type="text" class="form-control" placeholder="Enter a location"  v-model="post.city">
                <input type="text" id="latitude" v-model="post.latitude">
                <input type="text" id="longitude" v-model="post.longitude">
            </div>
        </div>
        <div class="form-group">
            <label for="distance">Distance</label>
            <input type="text" class="form-control" id="distance" placeholder="Distance" autocomplete="off" v-model="post.distance">
        </div>
        <div class="form-group">
            <label for="inputCity">Description</label>
            <textarea class="form-control" v-model="post.description" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary float-right">{{isEditing ? 'Update Post' : 'Create Post'}}</button>
    </form>
    <div id="map" style="width:500px; height:500px"></div>
    <div id="infowindow-content">
      <img src="" width="16" height="16" id="place-icon">
      <span id="place-name"  class="title"></span><br>
      <span id="place-address"></span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return{
            // post:[],
            sub_categories: [],
            bed_and_bath: ['1', '2', '3', '4', '5+'],
            property_type: ['apartment', 'condominium', 'house', 'room'],
            transmission: ['manual', 'automatic'],
            fuel: ['gasoline', 'diesel', 'hybrid', 'electric', 'other'],
            images: [],
        }
    },
    computed:mapGetters(['categories', 'typeId','postType', 'post', 'isEditing','baseUrl', 'subCategories']),
    methods:{
        setSubcategories(){
            this.categories.filter(category => {
                if(this.post.category_id === category.id){
                    this.sub_categories = category.sub_categories
                }
            })

        },
        handlePost(){
            if(this.isEditing){
                this.$store.dispatch('editPost', {post: this.post, images: this.images, postImages : this.post.images})
            }else{
                this.$store.dispatch('createPost', {post: this.post, images: this.images})
            }
        },
        onFileChange(e) {
            var selectedFiles = e.target.files;
            for (let i = 0; i < selectedFiles.length; i++) {
                // console.log(selectedFiles[i]);
                this.images.push(selectedFiles[i]);
            }

            for (let i = 0; i < this.images.length; i++) {
                let reader = new FileReader();
                reader.onload = () => {
                this.$refs.image[i].src = reader.result;

                // console.log(this.$refs.image[i].src);
                };

                reader.readAsDataURL(this.images[i]);
            }

        },
        removeFile( key ){
            if(this.isEditing){
               this.post.images.splice(key, 1)
            }else{
                this.images.splice( key, 1 );
            }
        },
        additionalRemoveImage(key){
            this.images.splice( key, 1 );
        },
        initMap() {

            let vm = this;
        var map = new window.google.maps.Map(document.getElementById('map'), {
          center: {
              lat: vm.isEditing ? parseFloat(vm.post.latitude) :  -33.8688,
              lng: vm.isEditing ? parseFloat(vm.post.longitude) : 151.2195},
             zoom: 15
        });
        var card = document.getElementById('pac-card');
        var input = document.getElementById('pac-input');
        map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(card);

        var autocomplete = new window.google.maps.places.Autocomplete(input);



        autocomplete.bindTo('bounds', map);

        // Set the data fields to return when the user selects a place.
        autocomplete.setFields(
            ['address_components', 'geometry', 'icon', 'name', 'formatted_address']);


        var infowindow = new window.google.maps.InfoWindow();
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
        var marker = new window.google.maps.Marker({
          map: map,
          anchorPoint: new window.google.maps.Point(0, -29)
        });

        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          marker.setVisible(false);
          var place = autocomplete.getPlace();
            vm.post.city = place.formatted_address

            console.log(vm.post.city)
           vm.post.latitude = place.geometry.location.lat();
           vm.post.longitude = place.geometry.location.lng();
          document.getElementById('latitude').value = vm.post.latitude
          document.getElementById('longitude').value = vm.post.longitude

          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

          infowindowContent.children['place-icon'].src = place.icon;
          infowindowContent.children['place-name'].textContent = place.name;
          infowindowContent.children['place-address'].textContent = address;
          infowindow.open(map, marker);
        });
      }


    },
    mounted(){
        this.$store.commit('setMessage', '')
        this.$store.commit('setErrors', '')

        if(this.isEditing){
             this.categories.filter(category => {
                if(this.post.category_id === category.id){
                    this.sub_categories = category.sub_categories
                }
            })
        }

        this.initMap()
    }
}
</script>

<style scoped>
textarea{
    resize: none;
}
</style>