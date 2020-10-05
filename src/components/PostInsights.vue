<template>
<div class="container">
    <h3>{{post.title ? post.title : post.brand}}</h3>
    <canvas id="my-chart" width="500" height="300" class="mt-4"></canvas>
    <p>push : <span>{{post.boost_left.days}} days</span> and {{post.boost_left.hours}} hours</p>
    <p>highlight : <span>{{post.highlight_left.days}} days</span> and {{post.highlight_left.hours}} hours</p>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Chart from 'chart.js';
export default {
    computed: mapGetters(['post']),
    data(){
        return{
            labels: [],
            clicks:[],
            chats:[],
            saved_posts:[],
            impressions:[]
        }
    },
    methods:{

    },
    mounted(){

    this.$store.dispatch('getPost', this.$route.params.id)
    this.post.post_insights.map(insight => {
      this.labels.push(insight.interaction_date)
      this.clicks.push(insight.clicks)
      this.chats.push(insight.chats)
      this.impressions.push(insight.impressions)
      this.saved_posts.push(insight.saved_posts)
    })

    new Chart(document.getElementById('my-chart'), {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'clicks',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: this.clicks
          },
          {
            label: 'chats',
            backgroundColor: 'rgb(255, 99, 60)',
            borderColor: 'rgb(255, 99, 60)',
            data: this.chats
          },
            {
            label: 'saved posts',
            backgroundColor: 'rgb(255, 10, 10)',
            borderColor: 'rgb(255, 10, 10)',
            data: this.saved_posts
          },
          {
            label: 'impressions',
           backgroundColor: 'rgb(0,0,0)',
            borderColor: 'rgb(0,0, 0)',
            data: this.impressions
          },

        ]
      },
        options: {
          responsive: true,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
    });


    console.log(this.post)

    }
}
</script>

<style>

</style>