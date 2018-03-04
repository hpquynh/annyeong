import Vue from 'vue';
import sweetalert from 'sweetalert';
import template from './index.html';


export default Vue.extend({
  template,
  data() {
   return{
     en: '',
     kr: ''
   }
  },
  created(){

  },
  methods: {

    add: function () {
      var obj = {
        table: []
      };
      obj.table.push({
        "id": "9",
        "lang": {
          "en":this.en,
          "kr":this.kr
        }
      });
      const data = JSON.stringify(obj);
      const blob = new Blob([data], {type: 'text/plain'})
      const e = document.createEvent('MouseEvents'),
        a = document.createElement('a');
      a.download = "test.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
      if((this.en != '') && (this.kr != '')){
        sweetalert('Success!', 'Added!!', 'success');
      }

      this.en = '';
      this.kr = '';
    }
  }
});
