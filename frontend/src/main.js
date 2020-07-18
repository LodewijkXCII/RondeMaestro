import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import FlagIcon from 'vue-flag-icon';
import moment from 'moment';

Vue.use(FlagIcon);
Vue.config.productionTip = false;

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value))
      .locale('nl')
      .format('dd D MMM');
  }
}),
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
