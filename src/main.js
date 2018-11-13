import Vue from 'vue'
import axios from 'axios';
import Vuelidate from 'vuelidate';

import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(Vuelidate);
axios.defaults.baseURL = 'https://vue-advanced-forms.firebaseio.com';
axios.defaults.headers.get['Accepts'] = 'application/json';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
