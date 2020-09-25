<template>
  <div class="container">
      <!-- <div v-for="faq in faqs" :key="faq.id">
          {{faq.title}}
          <div v-for="qna in faq.qna" :key="qna.id">
               <ul>
                    <li>{{qna.question}}</li>
                    <li>{{qna.answer}}</li>
                </ul>
          </div>
      </div> -->
      <div class="container">
        <div class="media-container-row">
            <div class="col-12 col-md-8">
                <div class="section-head text-center space30">
                    <h2 class="pb-5 pt-5">
                        Needr FAQ
                    </h2>
                </div>
                <div class="clearfix"></div>
                <div id="bootstrap-accordion_475" class="panel-group accordionStyles accordion" role="tablist" aria-multiselectable="true" v-for="faq in faqs" :key="faq.id">
                    <h2 class="pb-5 pt-5">
                      {{faq.title}}
                    </h2>
                    <div class="card" v-for="qna in faq.qna" :key="qna.id">
                        <div class="card-header" role="tab" id="headingOne">
                            <a role="button" class="panel-title collapsed text-black" data-toggle="collapse" data-parent="#bootstrap-accordion_475" data-core="" :href="'#collapse1_' + qna.id" aria-expanded="false" aria-controls="collapse1">
                                <h4 class="mbr-fonts-style display-5">
                                    <span class="sign mbr-iconfont mbri-arrow-down inactive"></span>
                                   {{qna.question}}
                                </h4>
                            </a>
                        </div>
                        <div :id="'collapse1_'+qna.id" class="panel-collapse noScroll collapse " role="tabpanel" aria-labelledby="headingOne">
                            <div class="panel-body p-4">
                                <p class="mbr-fonts-style panel-text display-7">
                                   {{qna.answer}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            faqs: []
        }
    },
    mounted(){
        axios.get('api/faq').then(res => this.faqs = res.data)

    }
}
</script>

<style>

</style>