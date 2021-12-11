import Vue from 'vue';
import VueMeta from 'vue-meta';
import App from './App.vue';
import router from './router';
import store from './store';
import FlagIcon from 'vue-flag-icon';
import moment from 'moment';
import axios from 'axios';
import VueAxios from 'vue-axios';

require('dotenv').config();

/* Fontawesome SOLID ICONS import en icons select  */
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faRoute,
  faTrophy,
  faThLarge,
  faListUl,
  faCheck,
  faTimes,
  faUsers,
  faPlus,
  faCaretDown,
  faCaretUp,
  faEdit,
  faBars,
  faArrowRight,
  faArrowLeft,
  faClipboardCheck,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

/* Fontawesome REGULAR ICONS import en icons select  */
import { faUser } from '@fortawesome/free-regular-svg-icons';

/* Fontawesome inelkaar zetter */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(
  faRoute,
  faTrophy,
  faThLarge,
  faListUl,
  faCheck,
  faTimes,
  faUser,
  faEdit,
  faUsers,
  faPlus,
  faCaretDown,
  faCaretUp,
  faBars,
  faArrowRight,
  faArrowLeft,
  faClipboardCheck,
  faTrash
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(FlagIcon);
Vue.use(VueAxios, axios);
Vue.use(VueMeta);

Vue.config.productionTip = false;

/* Locale date time dingetjes */
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value))
      .locale('nl')
      .format('D MMM');
  }
}),
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
