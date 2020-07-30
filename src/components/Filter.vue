<template>
  <div >
      <div>
        <div id="map" style="width: 100%; height:500px"></div>
        <div id="infowindow-content">
        <img src="" width="16" height="16" id="place-icon">
        <span id="place-name"  class="title"></span><br>
        <span id="place-address"></span>
        </div>
      </div>
    <div class="row">
         <div class="col-md-3">
        Type
         <div class="form-check" v-for="(type, index) in types" :key="index" >
            <input class="form-check-input" type="radio" v-model="filterType" :id="index" :value="type.value" @change="handleType(type)">
            <label class="form-check-label" :for="index">
                {{type.name}}
            </label>
        </div>
    </div>
    <div class="col-md-3">
        Sort By
         <div class="form-check" v-for="(filter, index) in filters" :key="index" >
            <input class="form-check-input" type="radio" v-model="sortByField" :id="index" :value="filter.value"   @change="handleFilter(filter)" >
            <label class="form-check-label" :for="index">
                {{filter.name}}
            </label>
        </div>

    </div>
    <div class="col-md-3">
        Product
        <div class="form-group">
            <label for="exampleFormControlSelect1">Condition</label>
            <select class="form-control" id="exampleFormControlSelect1" v-model="condition" @change="setCondition">
                <option value="New">New</option>
                <option value="Pre-loved">Pre Loved</option>
            </select>
        </div>
        <div class="form-group">
            <label for="">Min Price</label>
            <input type="number" class="form-control" v-model="min_price" @keyup.enter='setMinPrice'>
        </div>
          <div class="form-group">
            <label for="">Max Price</label>
            <input type="number" class="form-control" v-model="max_price"  @keyup.enter='setMaxPrice'>
        </div>
    </div>
     <div class="col-md-3">
        Deal Settings
        <div class="form-group">
            <label for="exampleFormControlSelect1">Meetup And Delivery</label>
            <select class="form-control" id="exampleFormControlSelect1" v-model="mode_of_shipping" @change="setModeOfShipping">
                <option value="Meetup">Meetup</option>
                <option value="Delivery">Delivery</option>
            </select>
        </div>
        <div class="form-group">
            <label for="exampleFormControlSelect1">Mode of Payment</label>
            <select class="form-control" id="exampleFormControlSelect1" v-model="mode_of_payment" @change="setModeOfPayment">
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
            </select>
        </div>
        <div class="form-group">
            <!-- <label for="">Location</label>
            <input type="text" class="form-control" v-model="city" @keyup.enter='setCity'> -->
            <label for="location">Location</label>
            <div id="pac-container">
                <input id="pac-input" type="text" class="form-control" placeholder="Enter a location"  v-model="city">
                <input type="text" id="latitude" v-model="latitude">
                <input type="text" id="longitude" v-model="longitude">
            </div>
        </div>
        <div class="form-group">
            <label for="">Distance</label>
            <input type="text" class="form-control" v-model="distance" @change="setDistance">
        </div>
    </div>
    </div >

</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: mapGetters(['sortBy']),
    data(){
        return {
            sortByField: '',
            sortDirection: 'ASC',
            filterType: '',
            condition: '',
            min_price: '',
            max_price: '',
            mode_of_shipping: '',
            mode_of_payment: '',
            city: '',
            distance: '',
            latitude: '',
            longitude : '',
            map: '',
            circle: '',
            types: [
                {
                    name: 'Posts',
                    value: 'post'
                },
                {
                    name: 'Profile',
                    value: 'profile'
                },
                {
                    name: 'Business',
                    value: 'business'
                },
            ],
            filters: [
                {
                    name: 'Relevance',
                    value: '',
                    sortDirection: ''
                },
                {
                    name: 'Latest First',
                    value: 'created_at',
                    sortDirection: 'DESC'
                },
                {
                    name: 'Price High to Low',
                    value: 'lowest_price',
                    sortDirection: 'DESC'
                },
                {
                    name: 'Price Low to High',
                    value: 'highest_price',
                    sortDirection: 'ASC'
                },
                {
                    name: 'Highest Rated',
                    value: 'rating',
                    sortDirection: 'DESC'
                },
                {
                    name: 'Nearest',
                    value: 'distance',
                    sortDirection: 'DESC'
                },
            ],

        }
    },
    methods:{

        handleFilter(filter){
            let sortBy  = this.sortByField === 'highest_price' || this.sortByField === 'lowest_price' ? 'price' : this.sortByField

            this.sortDirection = filter.sortDirection
            this.$store.commit('setSortBy', sortBy)
            this.$store.commit('setSortDirection', this.sortDirection)

            this.$store.dispatch('getPosts')
        },
        handleType(type){
           this.$store.commit('setFilterType', type.value)
           this.$store.dispatch('getPosts')
        },
        setCondition(){
            this.$store.commit('setCondition', this.condition)
            this.$store.dispatch('getPosts')
        },
        setModeOfShipping(){
            this.$store.commit('setModeOfShipping', this.mode_of_shipping)
            this.$store.dispatch('getPosts')
        },
        setModeOfPayment(){
            this.$store.commit('setModeOfPayment', this.mode_of_payment)
            this.$store.dispatch('getPosts')
        },
        setMinPrice(){
            this.$store.commit('setMinPrice', this.min_price)
            this.$store.dispatch('getPosts')
        },
        setMaxPrice(){
            this.$store.commit('setMaxPrice', this.max_price)
            this.$store.dispatch('getPosts')
        },
        setDistance(){
             this.circle.setRadius(parseInt(this.distance) * 1000);
             this.$store.commit('setDistance', parseInt(this.distance) * 1000)
             this.$store.dispatch('getPosts')
        },


        initMap() {

        let vm = this;
        var map = new window.google.maps.Map(document.getElementById('map'), {
          center: {
              lat: vm.latitude ? parseInt(vm.latitude) : -33.8688,
              lng: vm.longitude ? parseInt(vm.longitude) :  151.2195},
             zoom: 8
        });

        vm.map = map
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

        let circle = new window.google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map: map,
            radius: 1
        });
        circle.bindTo('center', marker, 'position');

        vm.circle = circle

        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          marker.setVisible(false);
          var place = autocomplete.getPlace();
            vm.city = place.formatted_address
            vm.latitude = place.geometry.location.lat()
            vm.longitude = place.geometry.location.lng()
            vm.distance = circle.radius
            vm.$store.commit('setLat', vm.latitude)
            vm.$store.commit('setLong', vm.longitude)
            vm.$store.commit('setCity', vm.city)
            vm.$store.commit('setDistance', circle.radius)
            vm.$store.dispatch('getPosts')

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
        this.initMap()
    }
}
</script>

<style>

</style>