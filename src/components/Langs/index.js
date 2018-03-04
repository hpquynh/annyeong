import Vue from 'vue';

import { postsResource } from 'src/util/resources';
import template from './index.html';
import {LANG_KR, LANG_EN, CODE_EN, CODE_KR} from "../../config/constants";

var interval;

export default Vue.extend({
  template,
  data() {
    return {
      posts: [],
      type: '1',
      isShowed: false,
      questionIndex: 0,
      time : 0
    };
  },


  created(){
    var language = '';

    if(this.$route.params.lang != null){
      if(this.$route.params.lang.toLowerCase() == LANG_EN){
        language = CODE_EN;
      }else if(this.$route.params.lang.toLowerCase() == LANG_KR){
        language = CODE_KR;
      }
    }
    if(this.$route.params.lang != ''){
      this.fetchPosts(language);
      this.questionIndex = Math.floor(Math.random() *  this.posts.length);
    }
    this.toggleTimer();
  },
  methods: {

    fetchPosts(param){
      return postsResource.get('')
        .then((response) => {
          // var currentIndex = response.data.length, temporaryValue, randomIndex;
          var currentIndex = response.data.length;
          while (0 !== currentIndex) {
            currentIndex -= 1;
            response.data[currentIndex].primary = (param === CODE_EN)? response.data[currentIndex].lang.en : response.data[currentIndex].lang.kr;
            response.data[currentIndex].result = (param === CODE_EN)? response.data[currentIndex].lang.kr : response.data[currentIndex].lang.en;
          }

          // While there remain elements to shuffle...
          // while (0 !== currentIndex) {
          //
          //   // Pick a remaining element...
          //   randomIndex = Math.floor(Math.random() * currentIndex);
          //   currentIndex -= 1;
          //
          //   // And swap it with the current element.
          //   response.data[currentIndex].primary = (param === CODE_EN)? response.data[currentIndex].lang.en : response.data[currentIndex].lang.kr;
          //   temporaryValue = response.data[currentIndex];
          //
          //   response.data[currentIndex] = response.data[randomIndex];
          //   response.data[randomIndex] = temporaryValue;
          //
          // }
        this.posts = response.data;

        this.type = param;
    })
    .catch((errorResponse) => {
        // Handle error...
        console.log('API responded with:', errorResponse);
    });

    },
    next: function () {
      var temp;
      temp = Math.floor(Math.random() *  this.posts.length);
      while (temp === this.questionIndex) {
        temp = Math.floor(Math.random() *  this.posts.length);
      }
      if(temp != this.questionIndex) this.questionIndex = temp ;
      this.isShowed = false;
      this.time = 0;
    },
    result: function () {
      this.isShowed = true;
      this.time = -1;
    },
    toggleTimer() {
      if (this.isShowed) {
        //debugger
        clearInterval(interval);
      } else {
        clearInterval(interval);
        interval = setInterval(this.incrementTime, 1000);
      }
    },
    incrementTime() {
      this.time = parseInt(this.time) + 1;
    },

    // // Methods for transitions
    // handleBeforeEnter(el) {
    //   el.style.opacity = 0;
    //   el.classList.add('animated');
    // },
    //
    // handleEnter(el) {
    //   const delay = el.dataset.index * animationDelay;
    //   setTimeout(() => {
    //     el.style.opacity = 1;
    //   el.classList.add(animation);
    // }, delay);
    // }
  }
});
